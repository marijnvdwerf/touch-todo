Ext.define('TouchTodo.controller.Todos', {
    extend: 'Ext.app.Controller',

    config: {
        models: [
            'Todo'
        ],

        stores: [
            'Todos'
        ],

        refs: {
            titleBar: '#todoTitleBar',
            list: '#todoList',
            deleteItemButton: '#todoList button',
            input: '#todoInput',
            filter: '#todoSegmentedButton',
            clear: '#clearCompletedButton'
        },

        control: {
            input: {
                action: 'addTodo'
            },
            list: {
                itemtap: 'tapItem'
            },
            deleteItemButton: {
                tap: 'deleteItem'
            },
            filter: {
                toggle: 'changeFilter'
            },
            clear: {
                tap: 'clearCompleted'
            }
        }
    },


    launch: function(app) {
        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');
        todoStore.on('write', this.writeStore, this);

        // Call function so the title gets properly set on launch
        this.writeStore(todoStore);
    },

    /**
     * Fires whenever a successful write has been made via the configured Proxy
     *
     * @see http://docs.sencha.com/touch/2.2.0/#!/api/Ext.data.Store-event-write
     *
     * @param {Ext.data.Store} store
     * @param {Ext.data.Operation} operation
     * @param {Object} eOpts
     */
    writeStore: function(store, operation, eOpts){
        /**
         * @type {Ext.TitleBar}
         */
        var titleBar = this.getTitleBar();

        var results = store.queryBy(
            /**
             * @param {TouchTodo.model.Todo} record
             * @param {Object} id
             */
            function(record, id) {
                return !record.get('checked');
            }
        );

        if(results.length === 0) {
            titleBar.setTitle("Nothing Todo");
        } else {
            titleBar.setTitle("Todo (" + results.length + ")");
        }
    },


    /**
     * Fires whenever the return key or go is pressed.
     *
     * @see http://docs.sencha.com/touch/2.0.2/#!/api/Ext.field.Text-event-action
     *
     * @param {Ext.field.Text} textField
     * @param {KeyboardEvent} e
     * @param {Object} eOpts
     */
    addTodo: function (textField, e, eOpts) {
        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');

        // Add new object to store
        todoStore.add({
            label: textField.getValue()
        });

        // Save store
        todoStore.sync();

        textField.setValue('');
    },


    /**
     * Fires whenever an item is tapped
     *
     * @see http://docs.sencha.com/touch/2.0.2/#!/api/Ext.dataview.List-event-itemtap
     *
     * @param {Ext.dataview.DataView} list
     * @param {Number} index
     * @param {Ext.dataview.component.DataItem} target
     * @param {TouchTodo.model.Todo} record
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    tapItem: function (list, index, target, record, e, eOpts) {
        record.set('checked', !record.get('checked'));

        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');
        todoStore.sync();
    },


    /**
     * Fires whenever an item's delete button is tapped.
     * 
     * @see http://docs.sencha.com/touch/2.2.0/#!/api/Ext.Button-event-tap
     * 
     * @param {Ext.Button} button
     * @param {Ext.event.Event} e
     * @param {object} eOpts
     */
    deleteItem: function(button, e, eOpts){
        e.stopPropagation();
        var todo = button.getParent().getRecord();
        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');

        todoStore.remove(todo);
        todoStore.sync();
    },


    /**
     * Fires when any child button's pressed state has changed.
     *
     * @param {Ext.SegmentedButton} segmentedButton
     * @param {Ext.Button} button The toggled button
     * @param {Boolean} isPressed Boolean to indicate if the button was pressed or not
     * @param {Object} eOpts The options object passed to Ext.util.Observable.addListener
     */
    changeFilter: function (segmentedButton, button, isPressed, eOpts) {
        if (!isPressed) {
            // The deselection of the previous item also triggers this event
            return;
        }

        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');
        var filterId = button.getId();

        todoStore.clearFilter();
        switch (filterId) {
            case 'filter-active':
                todoStore.filter('checked', false);
                break;
            case 'filter-completed':
                todoStore.filter('checked', true);
                break;
        }
    },


    /**
     * Fires whenever the clear button is tapped
     *
     * @see http://docs.sencha.com/touch/2.0.2/#!/api/Ext.Button-event-tap
     *
     * @param {Ext.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    clearCompleted: function (button, e, eOpts) {
        /**
         * @type {TouchTodo.store.Todos}
         */
        var todoStore = Ext.getStore('TodoStore');
        var completedTodos = todoStore.queryBy(function (record, id) {
            return record.get('checked');
        });
        todoStore.remove(completedTodos.all);
        todoStore.sync();
    }
});
