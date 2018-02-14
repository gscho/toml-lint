<template>
  <div id="app" class="container">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="build/dist/assets/toml-200.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Toml Lint
      </a>
      <a class="navbar-brand" href="https://github.com/toml-lang/toml">
        <img src="build/dist/assets/GitHub-32.png" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
    </nav>
    <h2 class="message">Enter your toml file below</h2>
    <div class="codemirror">
      <codemirror v-model="code" :options="cmOptions" @ready="onCmReady"></codemirror>
    </div>
    <div class="validate">
      <button v-on:click="validate" type="button" class="btn btn-primary btn-lg">Validate</button>
      <button v-on:click="clear" type="button" class="btn btn-secondary btn-lg">Clear</button>
    </div>
    <div v-show="err !== '' && valid === ''" class="alert alert-danger" role="alert">
      <p>Error on line {{ line }}:</p>
      <p>{{ err }}</p>
    </div>
    <div v-show="valid !== '' && err === ''" class="alert alert-success" role="alert">
      {{ valid }}
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/toml/toml.js'
import 'codemirror/theme/base16-light.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

var toml = toml || require('toml-j0.4');

export default {
  components: {
    codemirror
  },
  name: 'app',
  data () {
    return {
      code: '',
      err: '',
      line: 0,
      column: 0,
      valid: '',
      cminstance: null,
      cmOptions: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'toml',
        theme: 'base16-light',
        readOnly: false
      }
    }
  },
  methods: {
    highlight_error: function () {
      this.cminstance.addLineClass(this.line - 1, 'background', 'line-error');
      this.cminstance.setCursor(this.line - 1)
    },
    remove_highlight: function () {
      if (this.line !== 0) {
        this.cminstance.removeLineClass(this.line - 1, 'background', 'line-error');
      }
    },
    validate: function () {
      try {
        var data = toml.parse(this.code);
        this.valid = 'Valid toml'
        this.err = ''
        this.remove_highlight()
      } catch (err) {
          if (err instanceof toml.SyntaxError) {
              this.err = err.message
              this.remove_highlight()
              this.line = err.line
              this.column = err.column
              this.highlight_error()
              this.valid = ''
          }
      }
    },
    clear: function () {
      this.code = ''
      this.err = ''
      this.valid = ''
      this.remove_highlight()
    },
    onCmReady(cm) {
      this.cminstance = cm
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
  margin-top: 1em;
}

.alert {
  margin-top: 1em;
}

.line-error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

/*.CodeMirror {
  height: auto;
  min-height: 300px;
}*/

.codemirror {
  text-align: left;
}

.message {
  margin: 1em;
}

.validate {
  margin-top: 1em;
}
</style>
