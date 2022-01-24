<template>
  <div class="container">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ $auth.user.name }}</h2>
        <p class="lead text-muted">{{ $auth.user.email }}</p>
      </div>
    </div>

    <div class="row">
      <highlightjs autodetect :code="JSON.stringify($auth.user, null, 2)" class="rounded w-100" />
    </div>
    <p>Your API Auth:</p>
    <highlightjs autodetect
                 :code='JSON.stringify(
                   {"issueTokenUrl":"https://dev-xe71ik8z.us.auth0.com/oauth/token",
                   "client_id":"682urTJ9GlXTMWH8CWZ3rIunm0bTRI4q",
                   "client_secret":"kmPg5zlFTU15xBVmil3mEHG4qmgCSx2BnbW6se3D7-FChxbcY9rsv3ED-gflAbKa",
                   "audience":"https://api.seknot.net","grant_type":"client_credentials"
                   }, null, 2)' class="rounded w-100" />
  </div>
</template>

