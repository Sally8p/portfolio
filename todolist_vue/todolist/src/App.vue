<template>
  <v-app class="test">
    <v-container class="container">
      <v-card class="test1 mx-auto my-12 panel-borderless  " >
        <v-card-title class="title d-">:: To Do List</v-card-title>
        <v-card-text>
          <InputTodo @add-todo="addTodo" />
          <TodoList class="tdlist " :todoList="todoList" @delete-todo="deleteTodo" @toggle-completed="toggleCompleted" />
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import InputTodo from './components/InputTodo.vue'
import TodoList from './components/TodoList.vue'

const todoList = ref([
  { id: 1, todo: "자전거 타기", completed: false },
  { id: 2, todo: "딸과 공원 산책", completed: true },
  { id: 3, todo: "일요일 애견 카페", completed: false },
  { id: 4, todo: "Vue 원고 집필", completed: false },
])

const addTodo = (todo) => {
  if (todo.length >= 2) {
    todoList.value.push({ id: new Date().getTime(), todo: todo, completed: false })
  }
}

const deleteTodo = (id) => {
  const index = todoList.value.findIndex((item) => id === item.id)
  todoList.value.splice(index, 1)
}

const toggleCompleted = (id) => {
  const index = todoList.value.findIndex((item) => id === item.id)
  todoList.value[index].completed = !todoList.value[index].completed
}
</script>