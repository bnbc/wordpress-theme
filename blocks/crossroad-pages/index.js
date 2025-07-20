/**
 * Block for selecting pages to display as a grid of links.
 *
 * The editor UI mimics the Navigation block behaviour: a button "+" opens the
 * WordPress link search popover allowing the user to pick a page. Selected
 * pages are shown as small previews.
 */
( function( blocks, element, data, components, blockEditor ) {
    var el = element.createElement;
    var useState = element.useState;
    var useSelect = data.useSelect;
    var Button = components.Button;
    var Popover = components.Popover;
    var LinkControl = blockEditor.LinkControl || blockEditor.__experimentalLinkControl;

    function PagePreview( props ) {
        var id = props.id;
        var onRemove = props.onRemove;
        var record = useSelect( function( select ) {
            var page = select( 'core' ).getEntityRecord( 'postType', 'page', id );
            var media = page && page.featured_media ? select( 'core' ).getMedia( page.featured_media ) : null;
            return { page: page, media: media };
        }, [ id ] );

        if ( ! record.page ) {
            return el( 'div', { className: 'crossroad-page loading', key: id }, '...' );
        }

        var style = {};
        if ( record.media && record.media.source_url ) {
            style.backgroundImage = 'url(' + record.media.source_url + ')';
        }

        return el( 'div', { className: 'crossroad-page', style: style, key: id },
            el( Button, {
                className: 'crossroad-remove',
                icon: 'no-alt',
                label: 'Supprimer',
                onClick: function() { onRemove( id ); },
                'aria-label': 'Supprimer'
            } ),
            el( 'span', { className: 'crossroad-page-title' }, record.page.title.rendered )
        );
    }

    blocks.registerBlockType( 'twentytwentyfive-child/crossroad-pages', {
        title: 'Crossroad Pages',
        icon: 'grid-view',
        category: 'widgets',
        attributes: {
            pages: {
                type: 'array',
                items: { type: 'number' },
                default: []
            }
        },
        edit: function( props ) {
            var pages = props.attributes.pages || [];
            var setAttributes = props.setAttributes;

            var _useState = useState( false ),
                isOpen = _useState[0],
                setOpen = _useState[1];

            function addPage( value ) {
                if ( value && value.id ) {
                    setAttributes( { pages: pages.concat( value.id ) } );
                }
                setOpen( false );
            }

            function removePage( id ) {
                setAttributes( { pages: pages.filter( function( p ) { return p !== id; } ) } );
            }

            return el( 'div', {},
                el( 'div', { className: 'crossroad-pages' },
                    pages.map( function( id ) {
                        return el( PagePreview, { id: id, key: id, onRemove: removePage } );

                    } ),
                    el( Button, {
                        icon: 'plus',
                        onClick: function() { setOpen( true ); },
                        variant: 'primary'
                    } )
                ),
                isOpen && el( Popover, { position: 'bottom', onClose: function() { setOpen( false ); } },
                    el( LinkControl, {
                        onChange: addPage,
                        searchInputPlaceholder: 'Rechercher une page',
                        kind: 'post-type',
                        type: 'page'
                    } )
                )
            );
        },
        save: function() { return null; }
    } );
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.data,
    window.wp.components,
    window.wp.blockEditor
);
