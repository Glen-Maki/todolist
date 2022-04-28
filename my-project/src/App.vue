<template>
<div id="app" max-width="300">
  <v-app>
    <v-container align-content="center"> 
      <v-row
        justify="center"
        class="white align-center"
        style="min-height: 240px"
      >
        <v-card>
          <label v-for="label in options" v-bind:key="label.value">
            <input type="radio"
              v-model="current"
              v-bind:value="label.value">{{ label.label }}
          </label>
          <br>
          ({{ computedTodos.length }} 件を表示)
        </v-card>
      </v-row>
      <v-row
        justify="center"
        class="white align-center"
        style="min-height: 240px"
      >
        <v-card max-width="500">
          <table id="todotable">
            <thead v-pre>
             <tr>
                <th class="id">ID</th>
                <th class="comment">コメント</th>
                <th class="state">状態</th>
                <th class="button">-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in computedTodos"
                v-bind:key="item.id"
                v-bind:class="{done:item.state}">
                <th>{{ item.id }}</th>
                <td>{{ item.comment }}</td>
                <td class="state">
                  <v-btn @click="doChangeState(item)"
                    color="white"
                    class="primary ma-1"
                    >{{ labels[item.state] }}</v-btn>
                </td>
                <td class="button">
                  <v-btn @click="doRemove(item)" outlined color="red darken-1" class="ma-1">削除</v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card>
      </v-row>
      <v-row
        justify="center"
        class="white align-center"
        style="min-height: 240px"
      >
        <v-card max-width="500" align="center">
          <h2>新しい作業の追加</h2>
          <v-form class="add-form">
          <!-- コメント入力フォーム -->
          <v-text-field
            v-model="mycomment"
            type="text" 
            label="comment"
          ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn :disabled="!mycomment" @click="doAdd">追加</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</div>
</template>

<script>
import Vue from 'vue'
//import App from './App'
/* eslint-disable */
// const Line = require('./line')
// const myLine = new Line()


Vue.config.productionTip = false
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


export default Vue.extend({
  name: 'App',
  
  data:function(){
    return{
      todos: [],
      current: -1,
      options: [
        { value: -1, label: 'すべて' },
        { value: 0,  label: '作業中' },
        { value: 1,  label: '完了' }
      ],
      // 選択している options の value を記憶するためのデータ
      // 初期値を「-1」つまり「すべて」にする
      mycomment: ""
    }
  },
  computed: {
    computedTodos: function() {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    }  
  },  

  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },

  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  methods: {
    // ToDo 追加の処理
    doAdd: function() {
      // ref で名前を付けておいた要素を参照
      var comment = this.mycomment
      // 入力がなければ何もしないで return
      /*if (!comment.value.length) {
        return
      }*/
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment,
        state: 0
      })
      // myLine.notify(comment + "をやります！");
      // フォーム要素を空にする
      comment = ''
      
    },
    // 状態変更の処理
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    // 削除の処理
    doRemove: function(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
  },


});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#todotable {
  width: 500px;
  border-collapse: collapse;

}
th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}
td.state,td.button{
  text-align: center;
}
td {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;

}

</style>
