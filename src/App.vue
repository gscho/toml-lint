<template>
  <div id="app" class="container">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="./assets/toml-200.png" width="30" height="30" class="d-inline-block align-top" alt="">
        toml lint
      </a>
    </nav>
    <h1>{{ msg }}</h1>
    <div id="code" class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">With textarea</span>
      </div>
      <textarea class="form-control" aria-label="With textarea" rows="30"></textarea>
    </div>
    <div id="validate">
      <button type="button" class="btn btn-primary btn-lg">Validate</button>
      <button type="button" class="btn btn-secondary btn-lg">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Paste toml file below to lint'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#validate {
  margin-top: 10px
}
</style>
