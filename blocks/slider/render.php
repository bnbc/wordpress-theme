<?php
$slides = $attributes['slides'] ?? [];
if ( empty( $slides ) ) {
    return '';
}
ob_start();
?>
<div class="slider-block">
    <?php foreach ( $slides as $slide ) : ?>
        <div class="slide">
            <?php if ( isset( $slide['type'] ) && 'video' === $slide['type'] ) : ?>
                <video src="<?php echo esc_url( $slide['url'] ); ?>" controls></video>
            <?php else : ?>
                <img src="<?php echo esc_url( $slide['url'] ); ?>" alt="<?php echo esc_attr( $slide['alt'] ?? '' ); ?>" />
            <?php endif; ?>
            <?php if ( ! empty( $slide['title'] ) ) : ?>
                <h2><?php echo esc_html( $slide['title'] ); ?></h2>
            <?php endif; ?>
            <?php if ( ! empty( $slide['description'] ) ) : ?>
                <p><?php echo esc_html( $slide['description'] ); ?></p>
            <?php endif; ?>
            <?php if ( ! empty( $slide['buttonText'] ) && ! empty( $slide['link'] ) ) : ?>
                <a class="slide-button" href="<?php echo esc_url( $slide['link'] ); ?>">
                    <?php echo esc_html( $slide['buttonText'] ); ?>
                </a>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
    <button class="prev">&#171;</button>
    <button class="next">&#187;</button>
</div>
<?php
return ob_get_clean();
