import _route_11lqhgs from '/test/fixtures/prefix/static.vue?vue&type=route'
import _route_1502d9d from '/test/fixtures/prefix/static/static.vue?vue&type=route'
import _route_104js6n from '/test/fixtures/prefix/static/index.vue?vue&type=route'
import _route_1vr8nxz from '/test/fixtures/prefix/static/static.[dynamic].[dynamic].vue?vue&type=route'
import _route_t5ilti from '/test/fixtures/prefix/static/[dynamic].vue?vue&type=route'
import _route_57wvgr from '/test/fixtures/prefix/static/[...404].vue?vue&type=route'
import _route_o9zb5f from '/test/fixtures/unprefix/static.vue?vue&type=route'
import _route_m9of5w from '/test/fixtures/prefix/index.vue?vue&type=route'
import _route_16gl8kd from '/test/fixtures/unprefix/index.vue?vue&type=route'
import _route_zkw1du from '/test/fixtures/prefix/static.[dynamic].[dynamic].vue?vue&type=route'
import _route_jit8eh from '/test/fixtures/unprefix/static.[dynamic].[dynamic].vue?vue&type=route'
import _route_gnde4r from '/test/fixtures/prefix/[dynamic].vue?vue&type=route'
import _route_v0aaci from '/test/fixtures/prefix/[dynamic]/static.vue?vue&type=route'
import _route_alkx72 from '/test/fixtures/prefix/[dynamic]/index.vue?vue&type=route'
import _route_xbml14 from '/test/fixtures/prefix/[dynamic]/static.[dynamic].[dynamic].vue?vue&type=route'
import _route_1qqy6tx from '/test/fixtures/prefix/[dynamic]/[dynamic].vue?vue&type=route'
import _route_1pamkwc from '/test/fixtures/prefix/[dynamic]/[...404].vue?vue&type=route'
import _route_1wxksh0 from '/test/fixtures/unprefix/[dynamic].vue?vue&type=route'
import _route_73voba from '/test/fixtures/prefix/[...404].vue?vue&type=route'
import _route_1kwu0kd from '/test/fixtures/unprefix/[...404].vue?vue&type=route'


export const routes = [
  merge({
    path: '/prefix/static',
    component: () => import('/test/fixtures/prefix/static.vue'),
    children: [
      merge({
        path: 'static',
        component: () => import('/test/fixtures/prefix/static/static.vue'),
      }, _route_1502d9d),
      merge({
        path: '',
        component: () => import('/test/fixtures/prefix/static/index.vue'),
      }, _route_104js6n),
      merge({
        path: 'static/:dynamic/:dynamic',
        component: () => import('/test/fixtures/prefix/static/static.[dynamic].[dynamic].vue'),
      }, _route_1vr8nxz),
      merge({
        path: ':dynamic',
        component: () => import('/test/fixtures/prefix/static/[dynamic].vue'),
      }, _route_t5ilti),
      merge({
        path: '*',
        component: () => import('/test/fixtures/prefix/static/[...404].vue'),
      }, _route_57wvgr),
    ],
  }, _route_11lqhgs),
  merge({
    path: '/static',
    component: () => import('/test/fixtures/unprefix/static.vue'),
  }, _route_o9zb5f),
  merge({
    path: '/prefix',
    component: () => import('/test/fixtures/prefix/index.vue'),
  }, _route_m9of5w),
  merge({
    path: '/',
    component: () => import('/test/fixtures/unprefix/index.vue'),
  }, _route_16gl8kd),
  merge({
    path: '/prefix/static/:dynamic/:dynamic',
    component: () => import('/test/fixtures/prefix/static.[dynamic].[dynamic].vue'),
  }, _route_zkw1du),
  merge({
    path: '/static/:dynamic/:dynamic',
    component: () => import('/test/fixtures/unprefix/static.[dynamic].[dynamic].vue'),
  }, _route_jit8eh),
  merge({
    path: '/prefix/:dynamic',
    component: () => import('/test/fixtures/prefix/[dynamic].vue'),
    children: [
      merge({
        path: 'static',
        component: () => import('/test/fixtures/prefix/[dynamic]/static.vue'),
      }, _route_v0aaci),
      merge({
        path: '',
        component: () => import('/test/fixtures/prefix/[dynamic]/index.vue'),
      }, _route_alkx72),
      merge({
        path: 'static/:dynamic/:dynamic',
        component: () => import('/test/fixtures/prefix/[dynamic]/static.[dynamic].[dynamic].vue'),
      }, _route_xbml14),
      merge({
        path: ':dynamic',
        component: () => import('/test/fixtures/prefix/[dynamic]/[dynamic].vue'),
      }, _route_1qqy6tx),
      merge({
        path: '*',
        component: () => import('/test/fixtures/prefix/[dynamic]/[...404].vue'),
      }, _route_1pamkwc),
    ],
  }, _route_gnde4r),
  merge({
    path: '/:dynamic',
    component: () => import('/test/fixtures/unprefix/[dynamic].vue'),
  }, _route_1wxksh0),
  merge({
    path: '/prefix/*',
    component: () => import('/test/fixtures/prefix/[...404].vue'),
  }, _route_73voba),
  merge({
    path: '/*',
    component: () => import('/test/fixtures/unprefix/[...404].vue'),
  }, _route_1kwu0kd),
];


function merge(a,b) {
  return { ...a, ...b, meta: { ...a.meta, ...b.meta } }
}
  