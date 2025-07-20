( function( blocks, element ) {
    var el = element.createElement;
    blocks.registerBlockType( 'twentytwentyfive-child/crossroad-pages', {
        title: 'Crossroad Pages',
        icon: 'grid-view',
        category: 'widgets',
        attributes: {
            pages: { type: 'string', default: '' }
        },
        edit: function( props ) {
            return el( 'input', {
                type: 'text',
                value: props.attributes.pages,
                placeholder: 'IDs des pages séparées par une virgule',
                onChange: function( event ) {
                    props.setAttributes( { pages: event.target.value } );
                },
                style: { width: '100%' }
            } );
        },
        save: function() { return null; }
    } );
} )( window.wp.blocks, window.wp.element );
