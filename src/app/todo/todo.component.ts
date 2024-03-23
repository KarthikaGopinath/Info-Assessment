import { Component } from '@angular/core';
import { ToDo } from '../models/todo.model';
import { DataService } from '../services/get-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $ : any;

@Component({
  selector: 'app-infocusp-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  form!: FormGroup<any>;
  toDoList : ToDo[]  = [];
  tasksList : ToDo[] = [];
  isSubmitted = false;

  constructor(private dataService : DataService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.createFormBuilder();
    this.dataService.getTodoData().subscribe(res => {
      this.toDoList = res.todos;
      this.tasksList = this.toDoList;
    });
  }

  createFormBuilder() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      status: ['', [Validators.required]]
    });
  }

  getList(status : string) {
    if(status === "completed") {
      this.toDoList = this.tasksList.filter(toDos => toDos.completed);
    } else if (status === "pending") {
      this.toDoList = this.tasksList.filter(toDos => !toDos.completed);
    } else {
      this.toDoList = this.tasksList;
    }
  }

  openTaskPopup(showOrHide : string) {
    $('#exampleModal').modal(showOrHide);
  }

  addNewTask() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    var todo : ToDo = {
      id: this.toDoList.length,
      todo: this.form.value.name,
      completed : this.form.value.status == 'completed' ? true : false
    }
    this.tasksList.push(todo);
    this.toDoList = this.tasksList;
    this.isSubmitted = false;
    this.createFormBuilder();
    $('#exampleModal').modal('hide');
    this.openSnackBar("Task added.");   
  }

  removeTask(index : number) {
    console.log(index);
    var id = this.toDoList[index].id;
    var toDoVal = this.tasksList.findIndex( toDo => toDo.id == id);
    this.tasksList.splice(toDoVal, 1);
    this.toDoList = this.tasksList;
    this.openSnackBar("Task removed.");
  }

  openSnackBar(message: string) { 
    this.snackBar.open(message, 'X' , {duration:1500});
  }
}
