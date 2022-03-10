<script></script>

<template>
  <div v-if="$store.state.isOpen" :class="$style.details">
    <img
      :src="$store.state.user.avatar_url"
      alt="ava"
      :class="$style.details__avatar"
    />
    <div :class="$style.details__info">
      <h2>{{ $store.state.login }}</h2>
      <p :class="$style.details__info__date">
        Created at: {{ $store.state.created_at }}
      </p>
      <p v-if="$store.state.user.name" :class="$style.details__info__name">
        {{ $store.state.user.name }}
      </p>
      <p v-if="$store.state.user.location" :class="$style.details__info__date">
        Location: {{ $store.state.user.location }}
      </p>
      <p v-if="$store.state.user.email">{{ $store.state.user.email }}</p>
      <div v-if="$store.state.user.bio" :class="$style.details__info__bio">
        {{ $store.state.user.bio }}
      </div>
    </div>
    <svg
      @click="$store.state.isOpen = false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      :class="$style.iconExit"
    >
      <path
        d="M17.707 16.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 1.414-1.414L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293z"
      ></path>
    </svg>
  </div>
</template>

<style module>
.details {
  display: flex;
  justify-content: space-around;
  max-width: 750px;
  margin: 0 auto 10px;
  min-width: 450px;
  z-index: 100;
  padding: 10px;
  box-shadow: var(--box-shadow);
}
.details__avatar {
  border-radius: 50%;
  max-width: 200px;
  height: 100%;
}
.details__info {
  max-width: 400px;
}
.details__info__date {
  color: grey;
  font-size: 12px;
}
.details__info__name {
  font-size: 18px;
  font-weight: 500;
}
.iconExit {
  fill: grey;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.iconExit:hover {
  fill: black;
}
</style>
