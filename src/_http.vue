<script>
  export default {
    request (type, endpoint, body) {
      console.log("hello?")
      type = type.toLowerCase()
      var func = Vue.http[type]
      if (func) {
        return func(endpoint, body).catch((err) => {
          // if the error is something other than an auth error, return the error
          if (err.status !== 401) {
            if (err.body.msg)
              return err.body.msg
            else if (err.body.error)
              return err.body.error
          }

          // if auth error and refresh token exists, get a new access token
          if (err.body.msg && Vue.store.state.refresh_token) {
            // Set access token
            Vue.http.get(
              'refresh',
              {headers: {'Authorization': `Bearer ${Vue.store.state.refresh_token}`}}
            )
            .then((data) => {
              Vue.store.commit('access_token', data.body.access_token)
            })
            .then(() => {
              // retry the original request
              return func(endpoint,body)
            })
          }
        })
      }
      throw new Error('invalid request type')
    }
  }
</script>
