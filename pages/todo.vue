<template>
  <section class="container">
    <h1>TODOリスト</h1>
    <div class="addArea">
      <input v-model="content" name="addName" type="test" placeholder="タスクを入力してください">
      <button id="addButton" class="button button--green" @click="insert">
        追加
      </button>
    </div>
    <div class="Filter">
      <button class="button button--gray is active">
        全て
      </button>
      <button class="button button--gray">
        作業前
      </button>
      <button class="button button--gray">
        作業中
      </button>
      <button class="button button--gray">
        完了
      </button>
    </div>
    <table class="Lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in todos" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
            <button class="button">
              {{ item.state }}
            </button>
          </td>
          <td>
            <button class="button button--delete">
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
      content: ''
    }
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    insert () {
      if (this.content !== '') {
        this.$store.commit('insert', { content: this.content })
        this.content = ''
      }
    }
  }
}
</script>
