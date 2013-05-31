Ext.define('TouchTodo.model.Todo', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'label',
                type: 'string'
            },
            {
                name: 'checked',
                type: 'boolean',
                defaultValue: false
            }
        ],

        /**
         * Determines how ids should be generated
         * @see http://docs.sencha.com/touch/2.0.2/#!/api/Ext.data.Model-cfg-identifier
         */
        identifier: 'sequential'
    }
});
