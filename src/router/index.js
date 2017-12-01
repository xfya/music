import Vue from 'vue'
import Router from 'vue-router'

import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Recommend from 'components/recommend/recommend'
import singerDetail from 'components/singerDetail/singerDetail'
import Rank from 'components/rank/rank'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend',
        }, {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/singer',
            component: Singer,
            children: [{
                path: ':id',
                component: singerDetail
            }]
        },
        {
            path: '/rank',
            component: Rank
        },
    ]
})