<?php
$ids = array_map( 'intval', $attributes['pages'] ?? [] );
$ids = array_filter( $ids );
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
    <?php
        $thumb_url = get_the_post_thumbnail_url( get_the_ID(), 'medium' );
        $style = $thumb_url ? sprintf( ' style="background-image:url(%s)"', esc_url( $thumb_url ) ) : '';
    ?>
    <article class="crossroad-page"<?php echo $style; ?>>
        <a class="crossroad-page-link" href="<?php the_permalink(); ?>">
            <h2 class="crossroad-page-title"><?php the_title(); ?></h2>
        </a>
    </article>
<?php endwhile; ?>
</div>
<?php
wp_reset_postdata();
return ob_get_clean();
