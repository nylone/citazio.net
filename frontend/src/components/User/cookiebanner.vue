<template>
    <div>
        <b-alert 
            variant="warning" 
            show 
            dismissible
            class="position-fixed fixed-bottom m-0 rounded-0" 
            style="z-index: 2000;"
        > 
            This site uses cookies to function. <br />
            All cookies used are for technical purposes and will not be used for purposes outside the fruition of this service.
        </b-alert>

    </div>
</template>
<script>
    export default {
        name: "CookieBanner"
    }
</script>