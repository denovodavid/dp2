<template>
  <div class="hello">
    <!-- <banner text="Home">
      <p :style="{
        textAlign: 'center',
        maxWidth: '30rem'
      }">
        The People's Health Pharmacy is a locally-owned pharmacy that strives to provide
        the community with quality service and the widest range of products at the lowest
        prices.
      </p>
    </banner> -->
    <div class="banner">
      <div class="inner">
        <div class="row">
          <div class="column">
            <div class="banner-title">
              <span>Home</span>
            </div>
            <div class="subtext">
              <p>
                The People's Health Pharmacy is a locally-owned pharmacy that strives to provide
                the community with quality service and the widest range of products at the lowest
                prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-header">
      <p class="lead-text">Remember to be kind to customers and handle sales with care!</p>
      <p>
        Lorem ipsum dolor sit amet, ex vel semper salutatus. An nam dico percipit. Ad sed tantas phaedrum, mediocrem moderatius reprimique in nec. Iisque omnesque ius te. Duo salutandi moderatius suscipiantur ut, sale eirmod tractatos ex nam, in timeam meliore recusabo quo.
      </p>
      <p>
        Sit eu soleat euripidis voluptaria, qui facilisi invenire cu. Veri scribentur ne est. Sed cu quem repudiare sententiae, est veri impetus tractatos et. Ex has ocurreret definitiones.
      </p>
    </div>
    <div class="blog-items">
      <h2 class="blogs-heading">Recent News</h2>
      <div class="blog-item">
        <div class="blog-title">
          <span>Blog Title</span>
        </div>
        <div class="blog-image"></div>
        <div class="blog-desc">
          <p>
            Lorem ipsum dolor sit amet consectetur adepiscing something something I forget the rest
          </p>
        </div>
      </div>
      <div class="blog-item">
        <div class="blog-title">
          <span>Blog Title</span>
        </div>
        <div class="blog-image"></div>
        <div class="blog-desc">
          <p>
            Lorem ipsum dolor sit amet consectetur adepiscing something something I forget the rest
          </p>
        </div>
      </div>
      <div class="blog-item">
        <div class="blog-title">
          <span>Blog Title</span>
        </div>
        <div class="blog-image"></div>
        <div class="blog-desc">
          <p>
            Lorem ipsum dolor sit amet consectetur adepiscing something something I forget the rest
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'

export default {
  name: 'Home',
  components: {
    Banner
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
