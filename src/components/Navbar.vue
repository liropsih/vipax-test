<template>
  <div id="nav" class="mb-5">
    <b-navbar toggleable="md" class="px-5" type="light" variant="info">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Home' }" :exact-active-class="'active'">Мой профиль</b-nav-item>
          <b-nav-item :to="{ name: 'Team' }" :active-class="'active'">Моя команда</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>