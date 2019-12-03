import $https from '@/utils/https'

export function login(params) {
  return $https({
    url: '/mock/login',
    method: 'POST',
    params: params
  })
}
