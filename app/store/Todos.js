Ext.define('TouchTodo.store.Todos', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.LocalStorage'
    ],

    config: {
        model: 'TouchTodo.model.Todo',

        storeId: 'TodoStore',

        sorters: [
            {
                property: 'id',
                direction: 'ASC'
            }
        ],

        autoLoad: true,

        proxy: {
            type: 'localstorage',
            id: 'touch-todo'
        }
    }
});
