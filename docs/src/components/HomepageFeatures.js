import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "ブロックチェーン接続",
    Svg: require("../../static/img/blockchain.png").default,
    description: (
      <>
        普通ならWeb3を用いて操作しなければいけないブロックチェーン上のコントラクトに対して
        <code>API</code>１つで操作可能
      </>
    ),
  },
  {
    title: "トークン発行",
    Svg: require("../../static/img/token.png").default,
    description: (
      <>指定してトークンをAPIで簡単に発行して、サービスへの組み込みが可能</>
    ),
  },
  {
    title: "Wallet管理",
    Svg: require("../../static/img/wallet.png").default,
    description: (
      <>
        サーバー上でWalletを管理するので、ユーザーはWallet管理の心配をしなくて大丈夫
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={Svg} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
