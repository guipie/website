<template>
  <div>
    <div id="main">
      <!-- header -->
      <div id="header">
        <h1>
          此页面数据被鬼吃了..ERROR.
          <span> 你应该懂得.. </span>
        </h1>
      </div>
      <!-- content -->
      <div id="content">
        <ul class="nav"></ul>
      </div>
      <!-- footer -->
      <div id="footer">联系<a href="/">GuiPieApp@163.com</a>找到我</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
}
body {
  background: url(/img404/tail-top.gif) left top repeat-x #140100;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 100%;
  line-height: 1.5em;
  color: #cbe0ff;
}

img {
  border: 0;
  vertical-align: top;
  text-align: left;
}

ul,
ol {
  list-style: none;
}

.wrapper {
  width: 100%;
  overflow: hidden;
}

/*==== GLOBAL =====*/
#main {
  width: 100%;
  min-height: 800px;
  margin: 0 auto;
  background: url(/img404/main-bg.jpg) no-repeat left top;
  font-size: 1.3125em;
  position: absolute;
  left: 0px;
  top: 0px;
  /* display: none; */
  z-index: 1000;
  background-size: cover;
  -moz-background-size: cover;
  background-repeat: no-repeat;
  padding-top: 80px;
}

#header {
  height: 190px;
}
#content {
  min-height: 457px;
  height: auto !important;
  height: 457px;
}
#footer {
  font-family: Tahoma, Geneva, sans-serif;
  color: #333;
  font-size: 20px;
  text-align: center;
  padding: 20px 0 0 0;
}
#footer a {
  color: #333;
}

p {
  margin-bottom: 8px;
  text-align: center;
  font-size: 21px;
  padding: 0 35px;
}

/*----- txt, links, lines, titles -----*/
a {
  color: #fff;
  outline: none;
}
a:hover {
  text-decoration: none;
}

h1 {
  font-size: 55px;
  line-height: 1.2em;
  font-weight: normal;
  color: #cbe0ff;
  text-align: center;
  padding: 62px 0 0 0;
  font-variant: small-caps;
  text-transform: capitalize;
}
h1 span {
  display: block;
  font-size: 20px;
  line-height: 25px;
  font-variant: normal;
  text-transform: uppercase;
}
h1 strong {
  font-weight: normal;
  font-size: 1.11em;
}

/*===== content =====*/
#content .nav {
  position: relative;
  height: 368px;
}
#content .nav li {
  position: absolute;
  font-size: 14px;
  line-height: 1.2em;
  font-weight: bold;
  font-variant: small-caps;
  text-transform: capitalize;
}
#content .nav li.home {
  left: 47%;
  top: 100%;
  font-size: 18px;
}
#content .nav li.site_map {
  left: 30%;
  top: 100%;
}
#content .nav li.search {
  right: 30%;
  top: 100%;
}
#content .nav li a {
  color: #fff;
  text-decoration: none;
}
#content .nav li a:hover {
  text-decoration: underline;
}

/*==========================================*/
</style>
>
