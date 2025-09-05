import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import time

st.set_page_config(page_title="情報とメディアの特性", page_icon="🚀", layout="wide")

st.title("情報とメディアの特性")
st.caption("Created by Dit-Lab.(Daiki ITO)")
st.caption("Supported by Tomoaki ATSUMI")

st.header("はじめに - 「ただの数字」が「未来を変える行動」になるまで 🚀")
st.write("""
天気予報の「気温31.0℃」という数字を見て、私たちは「明日は暑いから半袖にしよう」と考えます。

このアプリでは、単なる事実や数字が、どのようにして私たちの行動を変える「意味のある情報」に変わっていくのか、
その不思議なプロセスを体験します。
""")

st.divider()

st.header("育てよう！情報の木 - DIKWモデル体験 🌱")
st.subheader("「データ」から「知恵」が生まれるまで")
st.write("情報の価値が高まっていく様子を、種が木に育つプロセスに例えて体験してみましょう。")

st.subheader("2-1. 【データ】の種をまく")
st.write("まずは、記録されたままの事実（データ）を見てみましょう。")

# Temperature data
data = {
    "日付": ["8/1", "8/2", "8/3", "8/4", "8/5"],
    "最高気温(℃)": [31.0, 32.1, 31.5, 33.0, 32.4]
}
df = pd.DataFrame(data)

st.table(df)
st.write("これだけでは「ふーん」で終わってしまいますね。これが「**データ**」です。")

st.subheader("2-2. 【情報】の芽が出る")
if st.button("このデータを整理すると？"):
    average_temp = df["最高気温(℃)"].mean()
    st.metric(label="この5日間の平均気温", value=f"{average_temp:.1f}℃", delta="平年より1.8℃高い")
    st.write("データを整理し、「平年より高い」という意味が加わりました。これが「**情報**」です。少し状況が分かってきました。")

st.subheader("2-3. 【知識】の幹が伸びる")
if st.button("過去のデータと比べると？"):
    # Historical data for the chart
    years = list(range(1994, 2024))
    historical_temps = [29.2, 29.1, 29.5, 29.3, 29.8, 29.6, 30.1, 29.9, 30.2, 30.4,
                       30.1, 30.6, 30.3, 30.8, 30.5, 31.0, 30.7, 31.2, 30.9, 31.4,
                       31.1, 31.6, 31.3, 31.8, 31.5, 32.0, 31.7, 32.2, 31.9, 32.4]
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=years, y=historical_temps, mode='lines+markers', name='8月上旬平均気温'))
    fig.update_layout(
        title="過去30年間の8月上旬平均気温の推移",
        xaxis_title="年",
        yaxis_title="平均気温(℃)",
        showlegend=False
    )
    st.plotly_chart(fig, use_container_width=True)
    
    st.write("""
    情報をさらに分析し、他の情報と関連付けると「この町の気温は、長期的に上昇傾向にある」という
    法則性（パターン）が見えてきます。これが「**知識**」です。
    """)

st.subheader("2-4. 【知恵】の実がなる")
st.write("この「知識」をもとに、町の未来のためにあなたならどうしますか？")

choice = st.radio("あなたならどうする？", ["特に何もしない", "町に緑を増やすなど、温暖化対策を提案する"])

if choice == "町に緑を増やすなど、温暖化対策を提案する":
    st.success("素晴らしい判断です！🌳")
    
st.write("""
知識を活用し、問題解決のための判断や行動を考えること。それが「**知恵**」です。
ただの数字が、未来を良くするアイデアに育ちました！
""")

st.divider()

st.header("ネットのうわさは消えない？ - 情報拡散シミュレーション 🗣️")
st.subheader("デジタル情報の恐ろしさと便利さ")
st.write("あなたがSNSに「近所のカフェで、有名人に会った！」と書き込んだとします。")

if st.button("投稿する！"):
    st.write("投稿中...")
    
    # Create containers for the animation
    likes_container = st.empty()
    shares_container = st.empty()
    
    # Animation of increasing numbers
    likes = [1, 50, 1200, 8500]
    shares = [1, 20, 400, 3100]
    
    for i in range(len(likes)):
        likes_container.metric("いいね！", likes[i])
        shares_container.metric("シェア", shares[i])
        time.sleep(0.8)
    
    st.success("投稿が大人気になりました！")
    
    st.write("しかし、後で人違いだったことが判明！慌てて投稿を削除します。")
    
    if st.button("投稿を削除する"):
        st.write("あなたの投稿は消えました。しかし…")
        
        st.error("「〇〇さんの投稿、スクショ撮っておいたよ」という友人のメッセージが届きました。")
        st.error("「有名人目撃情報まとめサイト」にあなたの投稿が引用されています。")
        
        st.write("""
        **デジタル情報は劣化せずに簡単に複製・再拡散されます。**
        
        一度ネットに広がると、完全に消すのはほぼ不可能です（デジタルタトゥー）。
        投稿前の「一呼吸」がとても大切です。
        """)

st.divider()

st.header("同じニュース、違う印象？ - メディアリテラシー体験")
st.subheader("メディアの「伝え方」を読み解こう")
st.write("「公園に新しい遊具が設置された」という同じ出来事を、2つのメディアが報じました。印象の違いを感じてみましょう。")

tab1, tab2 = st.tabs(["わくわくニュース", "もっと調査ニュース"])

with tab1:
    st.subheader("【朗報】子どもたちに笑顔！待望の最新遊具、公園に登場！")
    st.image("https://via.placeholder.com/600x300/90EE90/000000?text=子どもたちが笑顔で遊んでいる様子", caption="新しい遊具で楽しく遊ぶ子どもたち")
    
    st.write("""
    **子どもたちの声：**
    - 「すごく楽しい！毎日来たい！」（小学3年生）
    - 「待っていた甲斐がありました」（保護者）
    - 「安全で現代的な遊具で安心です」（保護者）
    
    新しい遊具の設置により、公園には子どもたちの笑い声が響いています。
    """)

with tab2:
    st.subheader("公園に新遊具、一方で「利用できる年齢が限られる」「古い遊具も残してほしかった」との声も")
    st.image("https://via.placeholder.com/600x300/A9A9A9/000000?text=古い遊具があった場所を見つめる子ども", caption="撤去された古い遊具があった場所")
    
    st.write("""
    **設置費用：** 約500万円（税込）
    
    **住民からの懸念の声：**
    - 「小さい子には使えない遊具が多い」（2歳児の保護者）
    - 「昔からあったブランコがなくなって寂しい」（近隣住民）
    - 「維持費用は大丈夫？」（税務関係者）
    
    新遊具の導入により、これまでとは異なる公園の姿に戸惑いの声も聞かれます。
    """)

st.write("""
**同じ出来事でも、どの側面を切り取るか、どんな写真や言葉を選ぶかで、受け手の印象は大きく変わります。**

メディアの情報は常に客観的とは限りません。送り手の意図を考え、情報を多角的に見る力（**メディアリテラシー**）が重要です。
""")

st.divider()

st.success("""
🎉 お疲れさまでした！

あなたは情報とメディアの特性について、以下のことを体験的に学びました：

1. **DIKWモデル**: データ → 情報 → 知識 → 知恵への変化プロセス
2. **デジタル情報の特性**: 複製・拡散の速さと永続性
3. **メディアリテラシー**: 同じ事実でも伝え方で印象が変わること

これらの知識を活かして、日常の情報との付き合い方を見直してみてください。
""")