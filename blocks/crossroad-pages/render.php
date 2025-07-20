<?php
$ids = array_filter( array_map( 'intval', explode( ',', $attributes['pages'] ?? '' ) ) );
if ( empty( $ids ) ) {
    return '';
}
$query = new WP_Query( [
    'post_type' => 'page',
    'post__in'  => $ids,
    'orderby'   => 'post__in',
] );
if ( ! $query->have_posts() ) {
    return '';
}
ob_start();
?>
<div class="crossroad-pages">
<?php while ( $query->have_posts() ) : $query->the_post(); ?>
    <article class="crossroad-page">
        <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'medium' ); ?></a>
        <?php endif; ?>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    </article>
<?php endwhile; ?>
</div>
<?php
wp_reset_postdata();
return ob_get_clean();
