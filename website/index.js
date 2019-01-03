import googleAnalytics from '@leptosia/docute-google-analytics'
import Docute from '../src'
import prismLanguages from '../src/utils/prismLanguages'

new Docute({
  target: 'app',
  title: 'bingosoft-epm 文档',
  highlight: ['typescript', 'bash','java','xml','sql'],
  plugins: [
    process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
  ].filter(Boolean),
  editLinkBase: 'http://114.67.22.75:10101/summary/~zhangheng%2Fapollo-doc.git',
  editLinkText: '编辑地址',
  componentMixins: [
    {
      data() {
        return {
          builtinLanguages: prismLanguages.builtin,
          deps: __DEPS__
        }
      }
    }
  ],
  nav: [
    {
      title: '首页',
      link: '/'
    }/*,
    {
      title: '实例网页',
      link: 'http://dg.depts.bingosoft.net'
    }*/
  ],
  sidebar: [
    {
      title: '使用指南',
      links: [
       /* {
          title: '学习vue',
          link: '/guide/writing'
        },
        {
          title: '在 Markdown 中使用 Vue',
          link: '/guide/use-vue-in-markdown'
        },*/
        {
          title: '代码规范',
          link: '/guide/standard'
        },
        {
          title: '代码生成',
          link: '/guide/code'
        },
        {
          title: '日志更改',
          link: '/guide/log'
        },
        {
          title: '页面开发',
          link: '/guide/page'
        },
      /*  {
          title: '自定义',
          link: '/guide/customization'
        },
        {
          title: '插件',
          link: '/guide/plugin'
        },
        {
          title: '部署',
          link: '/guide/deployment'
        }*/
      ]
    },
    {
      title: '常见知识点',
      links: [
/*        {
          title: '使用打包工具',
          link: '/guide/use-with-bundlers'
        }, {
          title: '前后端分离',
          link: '/guide/springboot-vue'
        },*/
        {
          title: '常见正则表达式',
          link: '/guide/Regular'
        },
        {
          title: '数据库导入导出',
          link: '/guide/database'
        }/*,
        {
          title: 'quartz源码分析',
          link: '/guide/quartz'
        }*/
      ],

    },
    {
      title: '参考',
      links: [
       /* {
          title: 'hutool',
          link: '/options'
        },
        {
          title: 'easypoi',
          link: '/builtin-components'
        },
        {
          title: 'mybatis plus',
          link: '/plugin-api'
        }*/
      ]
    },
    {
      title: '其它',
      links: [
        {
          title: '致谢',
          link: '/credits'
        }
      ]
    }
  ],
  pageData: () => fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      return posts.reduce((result, post) => {
        result['/post/' + post.id] = {
          title: post.title,
          content: post.body
        }
        return result
      }, {})
    })
})

Vue.component('ReverseText', {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="reverse-text">
      {{ reversedText }}
      <v-style>
      .reverse-text {
        border: 1px solid var(--border-color);
        padding: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  }
})
