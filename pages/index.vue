<template>
  <section class="container">
    <h1>Todo App</h1>
    <div>
      <input v-model="content" class="todo-input" type="text" name="content" @focus="set_flg">
      <v-btn color="blue" @click="insert">
        追加
      </v-btn>
    </div>
    <div>
      <v-btn-toggle tile color="light-blue" group>
        <v-btn elevation="2" @click="flag_reset">
          全て
        </v-btn>
        <v-btn elevation="2" @click="find('作業前')">
          作業前
        </v-btn>
        <v-btn elevation="2" @click="find('作業中')">
          作業中
        </v-btn>
        <v-btn elevation="2" @click="find('完了')">
          完了
        </v-btn>
      </v-btn-toggle>
    </div>
    <table class="lists">
      <thead>
        <tr>
          <th class="task">
            タスク
          </th>
          <th>登録日時</th>
          <th>状態</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in display_todos" :key="index">
          <td class="task">
            {{ todo.content }}
          </td>
          <td>{{ todo.created }}</td>
          <td>
            <button
              class="button"
              vbind:class="{
              'button--yet': todo.state == '作業前'
              'button--progress': todo.state == '作業中'
              'button--done': todo.state == '完了'}"
              @click="changeState(todo)"
            >
              {{ todo.state }}
            </button>
          </td>
          <td>
            <button class="button" @click="remove(todo)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      content: '',
      find_state: '',
      find_flg: false
    }
  },
  computed: {
    ...mapState(['todos']),
    display_todos () {
      if (this.find_flg) {
        const arr = []
        const data = this.todos
        data.forEach((element) => {
          if (element.state === this.find_state) {
            arr.push(element)
          }
        })
        return arr
      } else {
        return this.todos
      }
    }
  },
  methods: {
    insert () {
      this.$store.commit('insert', { content: this.content })
      this.content = ''
    },
    find (findState) {
      this.find_state = findState
      this.find_flg = true
    },
    flag_reset () {
      this.find_flg = false
    },
    set_flg () {
      if (this.find_flg) {
        this.find_flg = false
        this.content = ''
      }
    },
    remove (todo) {
      this.$store.commit('remove', todo)
    },
    changeState (todo) {
      this.$store.commit('changeState', todo)
    }
  }
}

</script>
