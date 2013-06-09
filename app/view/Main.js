Ext.define('TouchTodo.view.Main', {
    extend: 'Ext.Container',

    /**
     * Determines which types should be preloaded. If you omit a type, you get a warning in your console.
     */
    requires: [
        'Ext.TitleBar',
        'Ext.SegmentedButton',
        'Ext.dataview.List',
        'Ext.field.Text',
        'TouchTodo.view.Todo'
    ],

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                id: 'todoTitleBar',
                xtype: 'titlebar',
                docked: 'top',
                title: 'Todo',
                items: [
                    {
                        id: 'todoSegmentedButton',
                        xtype: 'segmentedbutton',
                        align: 'left',
                        items: [
                            {
                                id: 'filter-active',
                                text: 'Active'
                            },
                            {
                                id: 'filter-all',
                                text: 'All',
                                pressed: true
                            },
                            {
                                id: 'filter-completed',
                                text: 'Completed'
                            }
                        ]
                    },
                    {
                        id: 'clearCompletedButton',
                        xtype: 'button',
                        align: 'right',
                        text: 'Clear Completed'
                    }
                ]
            },
            {
                xtype: 'list',

                /**
                 * `id` of store that contains the data for this list
                 */
                store: 'TodoStore',
                id: 'todoList',
                disableSelection: true,

                useSimpleItems: false,
                defaultType: 'todoItem'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'todoInput',
                        placeHolder: 'What needs to be done?',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
