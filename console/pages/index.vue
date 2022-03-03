<template>
  <b-container class="pt-5">
    <b-row>
      <Hero />
      <b-container class="text-center">
        <a href="https://docs.seknot.net">
          <b-button size="lg" variant="outline-info">Document</b-button>
        </a>
      </b-container>
    </b-row>
    <hr>
    <b-jumbotron bg-variant="white" border-variant="dark" class="py-3">
      <h3>Beta版の利用について</h3>
      <p>
        現在Beta版としてSeknotを公開しています。<br>
        利用にはアカウント登録が必要です<br>
        また、このSekHackについての詳細は<a href="https://sechack365.nict.go.jp/presentation/">2021年度 SecHack365成果発表会</a>で発表予定ですので興味の有る方は是非お越しください。
      </p>
      <hr />
      <h5>Beta版を試す方へ</h5>
      <p>
        お気軽に感想やご意見などお寄せいただけると嬉しいです。<br>
        なお、DocumentにDiscord Botへ活用するSample Codeを掲載しておりますので、詳しい使用方法に関してはDocumentをご参照ください。<br>
        また、β版につき発行されたトークンやService Walletの消失による責任は負えませんので、あくまでも簡単なテストとしてご活用ください。
      </p>
    </b-jumbotron>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
