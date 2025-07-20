( function( blocks, element ) {
    var el = element.createElement;
    blocks.registerBlockType( 'twentytwentyfive-child/slider', {
        title: 'Slider',
        icon: 'images-alt2',
        category: 'widgets',
        attributes: {
            slides: { type: 'array', default: [] }
        },
        edit: function( props ) {
            var value = JSON.stringify( props.attributes.slides, null, 2 );
            return el( 'textarea', {
                value: value,
                onChange: function( event ) {
                    try {
                        props.setAttributes( { slides: JSON.parse( event.target.value ) } );
                    } catch ( e ) {}
                },
                style: { width: '100%', minHeight: '200px' }
            } );
        },
        save: function() {
            return null;
        }
    } );
} )( window.wp.blocks, window.wp.element );
