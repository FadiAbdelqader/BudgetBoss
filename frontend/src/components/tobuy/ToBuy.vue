<template>
    <dev width="auto">
        <h1>
            To-Buy List
        </h1>
        <div class="menu">
            <p class="tasks-left-text"> {{ incompletedTodos.length }} task(s) left! / {{ todos.length }} </p>
            <button @click="showAll = !showAll" class="determine-todos">
                {{ showAll ? 'Hide Completed' : 'Show All' }}
            </button>
        </div>
        <div class="parentSelectInput">
            <div class="childInput">
                <input
                    autofocus
                    class="add-task"
                    placeholder="Add a new task"
                    @keyup.enter="addTodo"
                    v-model = "tobuyObject.name"
                >
            </div>
            <div>
                <div class="childSelect">
                    <select class="selectList" id="category" v-model="tobuyObject.category">
                        <option v-for="category in categories" :key="category">
                        {{ category }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div v-for="todo in filteredTodos" :key="todo._id" class="todo-item">
            <label class="checkbox-container">
                <input
                    type="checkbox"
                    v-model="todo.completed"
                    >
                <span class="checkbox"> </span>
            </label>
            <p :class="{ completed: todo.completed }"> {{ todo.name }} </p>
            <button @click="removeTodo(todo)" class="delete-button"> X </button>
        </div>
    </dev>
  </template>

  <script>
    import api from "../api/api";
      export default {
            props:{
                tobuyObject: {
                    type: Object,
                    default: () => ({
                        name: "",
                        category: "",
                        date: new Date().toISOString().substr(0, 10),
                    }),
                }
            },
            data() {
                return {
                    todos: [],
                    categories: [
                        "Alimentation",
                        "Hébergement",
                        "Transport",
                        "Divertissement",
                        "Vêtements",
                        "Soins de santé",
                        "Loisirs",
                        "Éducation",
                        "Impôts",
                        "Assurances",
                        "Investissements",
                        "Dons",
                        "Autres",
                    ],
                    showAll: false,
                }
            },
            async created() {
                await this.getAll();
            },

          computed: {
                filteredTodos() {
                    return this.showAll ? this.todos : this.todos.filter((t) => !t.completed)
                },
                incompletedTodos() {
                    return this.todos.filter((t) => !t.completed)
                }
              },
          methods: {

                async selectCategory(){

                },

                async getAll(){
                    try{
                        const response = await api.get("/todos");
                        this.todos = response.data;
                    }
                    catch(e){
                        console.log(e)
                    }
                },
                async addTodo(e){
                    const value = e.target.value.trim()
                    console.log(value)
                    if (value === "") {
                        return;
                    }
                    this.tobuyObject.name = value;
                    await api.post("/todos", this.tobuyObject);
                    this.getAll();
                    e.target.value = ''
                },
                async removeTodo(todo) {
                    this.todos.splice(this.todos.indexOf(todo), 1);
                    await api.delete(`/todos/${todo._id}`);
                }
          }
      }
  </script>



  <style scoped>

    @import '../../assets/baseToBuy.css';
    h1 {
        font-weight: bold;
        color: white;
        padding: 8px 16px;
        background-color: rgb(57, 57, 57);
        border: solid grey;
        border-radius: 8px;
        margin-bottom: 16px;
        text-align: center;
        }
      .menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .tasks-left-text {
        color: white;
        text-align: left;
        margin-bottom: 6px;
      }

      .determine-todos {
          font-family: Verdana, sans-serif;
          align-self: center;
          border: solid grey;
          border-radius: 4px;
          color: white;
          font-weight: bold;
          background-color: rgb(100, 100, 100);
          padding: 4px 8px;
      }

      .selectList{
        background-color: black;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: white;
          margin: 8px 0px;
      }

      .selectList::placeholder{
        font-size: 14px;
        color: black;

      }

      .add-task {
          padding: 8px;
          font-size: 14px;
          width: 100%;
          background-color: black;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: white;
          margin: 8px 0px;
      }

      .add-task::placeholder {
          font-size: 14px;
          text-align: center;
      }

      .add-task:focus {
          border: solid white;
          border-width: 1px;
      }

      .todo-item {
          display: flex;
          justify-content: space-between;
          border: solid rgb(57, 57, 57);
          border-width: 2px;
          background-color: rgb(20, 20, 20);
          padding: 16px;
          color: white;
      }

      /* Customising checkbox guide https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */

      /* Customise checkbox container */
      .checkbox-container {
          display: block;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 22px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }

      /* Hide default checkbox */
      .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
      }

      /* Create a custom checkbox */
      .checkbox {
          height: 25px;
          width: 25px;
          background-color: rgb(80, 80, 80);
          position: absolute;
          top: 0;
          left: 0;
      }

      .checkbox-container:hover input ~ .checkbox {
          background-color: rgb(65, 65, 65);
      }

      .checkbox-container input:checked ~ .checkbox {
          background-color: rgb(55, 55, 55);
      }

      .checkbox:after {
          content: "";
          position: absolute;
          display: none;
      }

      /* Show the checkbox when checked */
      .checkbox-container input:checked ~ .checkbox:after {
          display: block;
      }

      /* Style the checkbox */
      .checkbox-container .checkbox:after {
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
      }
      .completed {
          text-decoration: line-through;
          text-decoration-thickness: 3px;
          color: #ccc;
      }

      .delete-button {
          border: none;
          font-weight: bold;
          background-color: rgb(20, 20, 20);
          color: white;
          font-size: 18px;
      }

        .parentSelectInput {
        margin: 1rem;
        padding: 2rem 2rem;
        text-align: center;
        }
        .childInput {
        width:100%;
        display: inline-block;
        padding: 1rem 1rem;
        vertical-align: middle;
        }

        .childSelect {
        display: inline-block;
        padding: 1rem 1rem;
        vertical-align: middle;
        }
  </style>
