<template>
  <div class="next-steps">
    <h2 class="my-5 text-center">Seknotの機能</h2>

    <div class="row">
      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/rules">
            <font-awesome-icon icon="link" class="mr-2" />GAS Tank
          </a>
        </h6>
        <p>第三者によるGASの支払いによるGAS-Less TXの実行</p>      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/rules">
            <font-awesome-icon icon="link" class="mr-2" />トークン発行
          </a>
        </h6>
        <p>簡単なAPI操作でTokenを発行可能</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/anomaly-detection">
            <font-awesome-icon icon="link" class="mr-2" />ウォレット管理
          </a>
        </h6>
        <p>サーバー上でWalletを管理するのでユーザはWalletの心配不要</p>
      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/rules">
            <font-awesome-icon icon="link" class="mr-2" />Blockchain接続
          </a>
        </h6>
        <p>APIを介して簡単にブロックチェーン上のトークンを操作可能</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContent"
};
</script>
