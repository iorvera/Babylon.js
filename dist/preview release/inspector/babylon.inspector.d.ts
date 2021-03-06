declare module INSPECTOR {
    class Inspector {
        private _c2diwrapper;
        /** The panel displayed at the top of the inspector */
        private _topPanel;
        /** The div containing the content of the active tab */
        private _tabPanel;
        /** The panel containing the list if items */
        /** The list if tree items displayed in the tree panel. */
        private _items;
        private _tabbar;
        private _scene;
        /** The HTML document relative to this inspector (the window or the popup depending on its mode) */
        static DOCUMENT: HTMLDocument;
        /** The HTML window. In popup mode, it's the popup itself. Otherwise, it's the current tab */
        static WINDOW: Window;
        /** True if the inspector is built as a popup tab */
        private _popupMode;
        /** The original canvas style, before applying the inspector*/
        private _canvasStyle;
        /** The inspector is created with the given engine.
         * If the parameter 'popup' is false, the inspector is created as a right panel on the main window.
         * If the parameter 'popup' is true, the inspector is created in another popup.
         */
        constructor(scene: BABYLON.Scene, popup?: boolean);
        /**
         * If the given element has a position 'asbolute' or 'relative',
         * returns the first parent of the given element that has a position 'relative' or 'absolute'.
         * If the given element has no position, returns the first parent
         *
         */
        private _getRelativeParent(elem, lookForAbsoluteOrRelative?);
        /** Build the inspector panel in the given HTML element */
        private _buildInspector(parent);
        readonly scene: BABYLON.Scene;
        readonly popupMode: boolean;
        /**
         * Filter the list of item present in the tree.
         * All item returned should have the given filter contained in the item id.
        */
        filterItem(filter: string): void;
        /** Display the mesh tab on the given object */
        displayObjectDetails(mesh: BABYLON.AbstractMesh): void;
        /** Clean the whole tree of item and rebuilds it */
        refresh(): void;
        /** Remove the inspector panel when it's built as a right panel:
         * remove the right panel and remove the wrapper
         */
        dispose(): void;
        /** Open the inspector in a new popup
         * Set 'firstTime' to true if there is no inspector created beforehands
         */
        openPopup(firstTime?: boolean): void;
    }
}

declare module INSPECTOR {
    const PROPERTIES: {
        format: (obj: any) => any;
        'type_not_defined': {
            properties: any[];
            format: () => string;
        };
        'Vector2': {
            type: typeof BABYLON.Vector2;
            properties: string[];
            format: (vec: BABYLON.Vector2) => string;
        };
        'Vector3': {
            type: typeof BABYLON.Vector3;
            properties: string[];
            format: (vec: BABYLON.Vector3) => string;
        };
        'Color3': {
            type: typeof BABYLON.Color3;
            properties: string[];
            format: (color: BABYLON.Color3) => string;
        };
        'Quaternion': {
            type: typeof BABYLON.Quaternion;
            properties: string[];
        };
        'Size': {
            type: typeof BABYLON.Size;
            properties: string[];
            format: (size: BABYLON.Size) => string;
        };
        'Texture': {
            type: typeof BABYLON.Texture;
            properties: string[];
            format: (tex: BABYLON.Texture) => string;
        };
        'ArcRotateCamera': {
            type: typeof BABYLON.ArcRotateCamera;
            properties: string[];
        };
        'Scene': {
            type: typeof BABYLON.Scene;
            properties: string[];
        };
        'Mesh': {
            type: typeof BABYLON.Mesh;
            properties: string[];
            format: (m: BABYLON.Mesh) => string;
        };
        'StandardMaterial': {
            type: typeof BABYLON.StandardMaterial;
            properties: string[];
            format: (mat: BABYLON.StandardMaterial) => string;
        };
        'PrimitiveAlignment': {
            type: typeof BABYLON.PrimitiveAlignment;
            properties: string[];
        };
        'PrimitiveThickness': {
            type: typeof BABYLON.PrimitiveThickness;
            properties: string[];
        };
        'BoundingInfo2D': {
            type: typeof BABYLON.BoundingInfo2D;
            properties: string[];
        };
        'SolidColorBrush2D': {
            type: typeof BABYLON.SolidColorBrush2D;
            properties: string[];
        };
        'GradientColorBrush2D': {
            type: typeof BABYLON.GradientColorBrush2D;
            properties: string[];
        };
        'PBRMaterial': {
            type: typeof BABYLON.PBRMaterial;
            properties: string[];
        };
    };
}

declare module INSPECTOR {
    /**
     * Represents a html div element.
     * The div is built when an instance of BasicElement is created.
     */
    abstract class BasicElement {
        protected _div: HTMLElement;
        constructor();
        /**
         * Returns the div element
         */
        toHtml(): HTMLElement;
        /**
         * Build the html element
         */
        protected _build(): void;
        abstract update(data?: any): any;
        /** Default dispose method if needed */
        dispose(): void;
    }
}

declare module INSPECTOR {
    interface IHighlight {
        highlight: (b: boolean) => void;
    }
    abstract class Adapter implements IHighlight {
        protected _obj: any;
        private static _name;
        constructor(obj: any);
        /** Returns the name displayed in the tree */
        abstract id(): string;
        /** Returns the type of this object - displayed in the tree */
        abstract type(): string;
        /** Returns the list of properties to be displayed for this adapter */
        abstract getProperties(): Array<PropertyLine>;
        /** Returns the actual object behind this adapter */
        readonly actualObject: any;
        /** Returns true if the given object correspond to this  */
        correspondsTo(obj: any): boolean;
        /** Returns the adapter unique name */
        readonly name: string;
        /** Returns the list of tools available for this adapter */
        abstract getTools(): Array<AbstractTreeTool>;
        /** Should be overriden in subclasses */
        highlight(b: boolean): void;
    }
}

declare module INSPECTOR {
    class Canvas2DAdapter extends Adapter implements IToolVisible, IToolDebug {
        constructor(obj: any);
        /** Returns the name displayed in the tree */
        id(): string;
        /** Returns the type of this object - displayed in the tree */
        type(): string;
        /** Returns the list of properties to be displayed for this adapter */
        getProperties(): Array<PropertyLine>;
        getTools(): Array<AbstractTreeTool>;
        setVisible(b: boolean): void;
        isVisible(): boolean;
        /** Overrides super */
        debug(b: boolean): void;
        /** Overrides super.highlight */
        highlight(b: boolean): void;
    }
}

declare module INSPECTOR {
    class LightAdapter extends Adapter implements IToolVisible {
        private static _PROPERTIES;
        constructor(obj: BABYLON.Light);
        /** Returns the name displayed in the tree */
        id(): string;
        /** Returns the type of this object - displayed in the tree */
        type(): string;
        /** Returns the list of properties to be displayed for this adapter */
        getProperties(): Array<PropertyLine>;
        getTools(): Array<AbstractTreeTool>;
        setVisible(b: boolean): void;
        isVisible(): boolean;
        /** Returns some information about this mesh */
        /** Overrides super.highlight */
        highlight(b: boolean): void;
    }
}

declare module INSPECTOR {
    class MaterialAdapter extends Adapter {
        constructor(obj: BABYLON.Material);
        /** Returns the name displayed in the tree */
        id(): string;
        /** Returns the type of this object - displayed in the tree */
        type(): string;
        /** Returns the list of properties to be displayed for this adapter */
        getProperties(): Array<PropertyLine>;
        /** No tools for a material adapter */
        getTools(): Array<AbstractTreeTool>;
        /** Overrides super.highlight.
         * Highlighting a material outlines all meshes linked to this material
         */
        highlight(b: boolean): void;
    }
}

declare module INSPECTOR {
    class MeshAdapter extends Adapter implements IToolVisible, IToolDebug, IToolBoundingBox, IToolInfo {
        /** Keep track of the axis of the actual object */
        private _axis;
        constructor(obj: BABYLON.AbstractMesh);
        /** Returns the name displayed in the tree */
        id(): string;
        /** Returns the type of this object - displayed in the tree */
        type(): string;
        /** Returns the list of properties to be displayed for this adapter */
        getProperties(): Array<PropertyLine>;
        getTools(): Array<AbstractTreeTool>;
        setVisible(b: boolean): void;
        isVisible(): boolean;
        isBoxVisible(): boolean;
        setBoxVisible(b: boolean): boolean;
        debug(b: boolean): void;
        /** Returns some information about this mesh */
        getInfo(): string;
        /** Overrides super.highlight */
        highlight(b: boolean): void;
        /** Draw X, Y and Z axis for the actual object if this adapter.
         * Should be called only one time as it will fill this._axis
         */
        private _drawAxis();
    }
}

declare module INSPECTOR {
    interface SortDirection {
        [property: string]: number;
    }
    class DetailPanel extends BasicElement {
        private _headerRow;
        private _detailRows;
        private _sortDirection;
        constructor(dr?: Array<PropertyLine>);
        details: Array<PropertyLine>;
        protected _build(): void;
        /** Updates the HTML of the detail panel */
        update(): void;
        /** Add all lines in the html div. Does not sort them! */
        private _addDetails();
        /**
         * Sort the details row by comparing the given property of each row
         */
        private _sortDetails(property, _direction?);
        /**
         * Removes all data in the detail panel but keep the header row
         */
        clean(): void;
        /** Overrides basicelement.dispose */
        dispose(): void;
        /**
         * Creates the header row : name, value, id
         */
        private _createHeaderRow();
    }
}

declare module INSPECTOR {
    /**
     * A property is a link between a data (string) and an object.
     */
    class Property {
        /** The property name */
        private _property;
        /** The obj this property refers to */
        private _obj;
        constructor(prop: string, obj: any);
        readonly name: string;
        value: any;
        readonly type: string;
        obj: any;
    }
}

declare module INSPECTOR {
    class PropertyFormatter {
        /**
         * Format the value of the given property of the given object.
         */
        static format(obj: any, prop: string): string;
    }
    /**
     * A property line represents a line in the detail panel. This line is composed of :
     * - a name (the property name)
     * - a value if this property is of a type 'simple' : string, number, boolean, color, texture
     * - the type of the value if this property is of a complex type (Vector2, Size, ...)
     * - a ID if defined (otherwise an empty string is displayed)
     * The original object is sent to the value object who will update it at will.
     *
     * A property line can contain OTHER property line objects in the case of a complex type.
     * If this instance has no link to other instances, its type is ALWAYS a simple one (see above).
     *
     */
    class PropertyLine {
        private _property;
        private _div;
        private _valueDiv;
        private _children;
        private static _SIMPLE_TYPE;
        private static _MARGIN_LEFT;
        private _level;
        /** The list of viewer element displayed at the end of the line (color, texture...) */
        private _elements;
        /** The property parent of this one. Used to update the value of this property and to retrieve the correct object */
        private _parent;
        /** The input element to display if this property is 'simple' in order to update it */
        private _input;
        /** Display input handler (stored to be removed afterwards) */
        private _displayInputHandler;
        /** Handler used to validate the input by pressing 'enter' */
        private _validateInputHandler;
        constructor(prop: Property, parent?: PropertyLine, level?: number);
        /**
         * Init the input element and al its handler :
         * - a click in the window remove the input and restore the old property value
         * - enters updates the property
         */
        private _initInput();
        /**
         * On enter : validates the new value and removes the input
         * On escape : removes the input
         */
        private _validateInput(e);
        /** Removes the input without validating the new value */
        private _removeInputWithoutValidating();
        /** Replaces the default display with an input */
        private _displayInput(e);
        /** Retrieve the correct object from its parent.
         * If no parent exists, returns the property value.
         * This method is used at each update in case the property object is removed from the original object
         * (example : mesh.position = new BABYLON.Vector3 ; the original vector3 object is deleted from the mesh).
        */
        updateObject(): any;
        readonly name: string;
        readonly value: any;
        readonly type: string;
        /**
         * Creates elements that wil be displayed on a property line, depending on the
         * type of the property.
         */
        private _createElements();
        private _displayValueContent();
        /** Delete properly this property line.
         * Removes itself from the scheduler.
         * Dispose all viewer element (color, texture...)
         */
        dispose(): void;
        /** Updates the content of _valueDiv with the value of the property,
         * and all HTML element correpsonding to this type.
         * Elements are updated as well
         */
        private _updateValue();
        /**
         * Update the property division with the new property value.
         * If this property is complex, update its child, otherwise update its text content
         */
        update(): void;
        /**
         * Returns true if the given instance is a simple type
         */
        private static _IS_TYPE_SIMPLE(inst);
        /**
         * Returns true if the type of this property is simple, false otherwise.
         * Returns true if the value is null
         */
        private _isSimple();
        toHtml(): HTMLElement;
        /**
         * Add sub properties in case of a complex type
         */
        private _addDetails();
    }
}

declare module INSPECTOR {
    /**
    * Display a very small div corresponding to the given color
    */
    class ColorElement extends BasicElement {
        constructor(color: BABYLON.Color4 | BABYLON.Color3);
        update(color?: BABYLON.Color4 | BABYLON.Color3): void;
        private _toRgba(color);
    }
}

declare module INSPECTOR {
    /**
    * Display a very small div. A new canvas is created, with a new Babylon.js scene, containing only the
    * cube texture in a cube
    */
    class CubeTextureElement extends BasicElement {
        /** The big div displaying the full image */
        private _textureDiv;
        private _engine;
        protected _scene: BABYLON.Scene;
        protected _cube: BABYLON.Mesh;
        private _canvas;
        protected _textureUrl: string;
        private _pause;
        /** The texture given as a parameter should be cube. */
        constructor(tex: BABYLON.Texture);
        update(tex?: BABYLON.Texture): void;
        /** Creates the box  */
        protected _populateScene(): void;
        /** Init the babylon engine */
        private _initEngine();
        private _showViewer(mode);
        /** Removes properly the babylon engine */
        dispose(): void;
    }
}

declare module INSPECTOR {
    /**
    * Display a very small div. A new canvas is created, with a new Babylon.js scene, containing only the
    * cube texture in a cube
    */
    class HDRCubeTextureElement extends CubeTextureElement {
        /** The texture given as a parameter should be cube. */
        constructor(tex: BABYLON.Texture);
        /** Creates the box  */
        protected _populateScene(): void;
    }
}

declare module INSPECTOR {
    /**
     * A search bar can be used to filter elements in the tree panel.
     * At each keypress on the input, the treepanel will be filtered.
     */
    class SearchBar extends BasicElement {
        private _tab;
        private _inputElement;
        constructor(tab: PropertyTab);
        /** Delete all characters typped in the input element */
        reset(): void;
        update(): void;
    }
}

declare module INSPECTOR {
    /**
    * Display a very small div corresponding to the given texture. On mouse over, display the full image
    */
    class TextureElement extends BasicElement {
        /** The big div displaying the full image */
        private _textureDiv;
        constructor(tex: BABYLON.Texture);
        update(tex?: BABYLON.Texture): void;
        private _showViewer(mode);
    }
}

declare module INSPECTOR {
    /**
     * Creates a tooltip for the parent of the given html element
     */
    class Tooltip {
        /** The tooltip is displayed for this element */
        private _elem;
        /** The tooltip div */
        private _infoDiv;
        constructor(elem: HTMLElement, tip: string, attachTo?: HTMLElement);
    }
}

declare module INSPECTOR {
    class Helpers {
        /**
         * Returns the type of the given object. First
         * uses getClassName. If nothing is returned, used the type of the constructor
         */
        static GET_TYPE(obj: any): string;
        /**
         * Check if some properties are defined for the given type.
         */
        private static _CheckIfTypeExists(type);
        /**
         * Returns true if the user browser is edge.
         */
        static IsBrowserEdge(): boolean;
        /**
         * Returns the name of the type of the given object, where the name
         * is in PROPERTIES constant.
         * Returns 'Undefined' if no type exists for this object
         */
        private static _GetTypeFor(obj);
        /**
         * Returns the name of a function (workaround to get object type for IE11)
         */
        private static _GetFnName(fn);
        /** Send the event which name is given in parameter to the window */
        static SEND_EVENT(eventName: string): void;
        /** Returns the given number with 2 decimal number max if a decimal part exists */
        static Trunc(nb: any): number;
        /**
         * Useful function used to create a div
         */
        static CreateDiv(className?: string, parent?: HTMLElement): HTMLElement;
        static CreateElement(element: string, className?: string, parent?: HTMLElement): HTMLElement;
        /**
         * Removes all children of the given div.
         */
        static CleanDiv(div: HTMLElement): void;
        /**
         * Returns the true value of the given CSS Attribute from the given element (in percentage or in pixel, as it was specified in the css)
         */
        static Css(elem: HTMLElement, cssAttribute: string): string;
        static LoadScript(): void;
        static IsSystemName(name: string): boolean;
    }
}

declare module INSPECTOR {
    class Scheduler {
        private static _instance;
        /** The number of the set interval */
        private _timer;
        /** Is this scheduler in pause ? */
        pause: boolean;
        /** All properties are refreshed every 250ms */
        static REFRESH_TIME: number;
        /** The list of data to update */
        private _updatableProperties;
        constructor();
        static getInstance(): Scheduler;
        /** Add a property line to be updated every X ms */
        add(prop: PropertyLine): void;
        /** Removes the given property from the list of properties to update */
        remove(prop: PropertyLine): void;
        private _update();
    }
}

declare module INSPECTOR {
    abstract class Tab extends BasicElement {
        protected _tabbar: TabBar;
        name: string;
        protected _isActive: boolean;
        protected _panel: HTMLDivElement;
        constructor(tabbar: TabBar, name: string);
        /** True if the tab is active, false otherwise */
        isActive(): boolean;
        protected _build(): void;
        /** Set this tab as active or not, depending on the current state */
        active(b: boolean): void;
        update(): void;
        /** Creates the tab panel for this tab. */
        getPanel(): HTMLElement;
        /** Add this in the propertytab with the searchbar */
        filter(str: string): void;
        /** Dispose properly this tab */
        abstract dispose(): any;
        /**
         * Returns the total width in pixel of this tab, 0 by default
        */
        getPixelWidth(): number;
    }
}

declare module INSPECTOR {
    /**
     * A Property tab can creates two panels:
     * a tree panel and a detail panel,
     * in which properties will be displayed.
     * Both panels are separated by a resize bar
     */
    abstract class PropertyTab extends Tab {
        protected _inspector: Inspector;
        /** The panel containing a list of items */
        protected _treePanel: HTMLElement;
        /** The panel containing a list if properties corresponding to an item */
        protected _detailsPanel: DetailPanel;
        protected _treeItems: Array<TreeItem>;
        protected _searchBar: SearchBar;
        constructor(tabbar: TabBar, name: string, insp: Inspector);
        /** Overrides dispose */
        dispose(): void;
        update(_items?: Array<TreeItem>): void;
        /** Display the details of the given item */
        displayDetails(item: TreeItem): void;
        /** Select an item in the tree */
        select(item: TreeItem): void;
        /** Highlight the given node, and downplay all others */
        highlightNode(item?: TreeItem): void;
        /** Set the given item as active in the tree */
        activateNode(item: TreeItem): void;
        /** Returns the treeitem corersponding to the given obj, null if not found */
        getItemFor(_obj: any): TreeItem;
        filter(filter: string): void;
        /** Builds the tree panel */
        protected abstract _getTree(): Array<TreeItem>;
    }
}

declare module INSPECTOR {
    class Canvas2DTab extends PropertyTab {
        constructor(tabbar: TabBar, inspector: Inspector);
        protected _getTree(): Array<TreeItem>;
    }
}

declare module INSPECTOR {
    class LightTab extends PropertyTab {
        constructor(tabbar: TabBar, inspector: Inspector);
        protected _getTree(): Array<TreeItem>;
    }
}

declare module INSPECTOR {
    class MaterialTab extends PropertyTab {
        constructor(tabbar: TabBar, inspector: Inspector);
        protected _getTree(): Array<TreeItem>;
    }
}

declare module INSPECTOR {
    class MeshTab extends PropertyTab {
        constructor(tabbar: TabBar, inspector: Inspector);
        protected _getTree(): Array<TreeItem>;
    }
}

declare module INSPECTOR {
    class SceneTab extends Tab {
        private _inspector;
        /** The list of  channels/options that can be activated/deactivated */
        private _actions;
        /** The list of skeleton viewer */
        private _skeletonViewers;
        /** The detail of the scene */
        private _detailsPanel;
        constructor(tabbar: TabBar, insp: Inspector);
        /** Overrides super.dispose */
        dispose(): void;
        /** generates a div which correspond to an option that can be activated/deactivated */
        private _generateActionLine(name, initValue, action);
        /**
         * Add a click action for all given elements :
         * the clicked element is set as active, all others elements are deactivated
         */
        private _generateRadioAction(arr);
    }
}

declare module INSPECTOR {
    class ShaderTab extends Tab {
        private _inspector;
        private _vertexPanel;
        private _fragmentPanel;
        constructor(tabbar: TabBar, insp: Inspector);
        private _selectShader(event);
        /** Overrides super.dispose */
        dispose(): void;
        /** Returns the position of the first { and the corresponding } */
        private _getBracket(str);
        /**
         * Beautify the given string : correct indentation
         */
        private _beautify(glsl, level?);
    }
}

declare module INSPECTOR {
    /**
     * The console tab will have two features :
     * - hook all console.log call and display them in this panel (and in the browser console as well)
     * - display all Babylon logs (called with Tools.Log...)
     */
    class ConsoleTab extends Tab {
        private _inspector;
        private _consolePanelContent;
        private _bjsPanelContent;
        private _oldConsoleLog;
        private _oldConsoleWarn;
        private _oldConsoleError;
        constructor(tabbar: TabBar, insp: Inspector);
        /** Overrides super.dispose */
        dispose(): void;
        private _message(type, message, caller);
        private _addConsoleLog(...params);
        private _addConsoleWarn(...params);
        private _addConsoleError(...params);
    }
}

declare module INSPECTOR {
    class StatsTab extends Tab {
        private _inspector;
        /**
         * Properties in this array will be updated
         * in a render loop - Mostly stats properties
         */
        private _updatableProperties;
        private _scene;
        private _engine;
        private _glInfo;
        private _updateLoopHandler;
        constructor(tabbar: TabBar, insp: Inspector);
        private _createStatLabel(content, parent);
        /** Update each properties of the stats panel */
        private _update();
        dispose(): void;
    }
}

declare module INSPECTOR {
    /**
     * A tab bar will contains each view the inspector can have : Canvas2D, Meshes...
     * The default active tab is the first one of the list.
     */
    class TabBar extends BasicElement {
        private _tabs;
        private _inspector;
        /** The tab displaying all meshes */
        private _meshTab;
        /** The toolbar */
        private _toolBar;
        /** The icon displayed at the end of the toolbar displaying a combo box of tabs not displayed */
        private _moreTabsIcon;
        /** The panel displayed when the 'more-tab' icon is selected */
        private _moreTabsPanel;
        /** The list of tab displayed by clicking on the remainingIcon */
        private _invisibleTabs;
        /** The list of tabs visible, displayed in the tab bar */
        private _visibleTabs;
        constructor(inspector: Inspector);
        update(): void;
        protected _build(): void;
        /**
         * Add a tab to the 'more-tabs' panel, displayed by clicking on the
         * 'more-tabs' icon
         */
        private _addInvisibleTabToPanel(tab);
        /** Dispose the current tab, set the given tab as active, and refresh the treeview */
        switchTab(tab: Tab): void;
        /** Display the mesh tab.
         * If a parameter is given, the given mesh details are displayed
         */
        switchMeshTab(mesh?: BABYLON.AbstractMesh): void;
        /** Returns the active tab */
        getActiveTab(): Tab;
        readonly inspector: Inspector;
        /**
         * Returns the total width in pixel of the tabbar,
         * that corresponds to the sum of the width of each visible tab + toolbar width
        */
        getPixelWidth(): number;
        /** Display the remaining icon or not depending on the tabbar width.
         * This function should be called each time the inspector width is updated
         */
        updateWidth(): void;
    }
}

declare module INSPECTOR {
    abstract class AbstractTool {
        private _elem;
        protected _inspector: Inspector;
        constructor(icon: string, parent: HTMLElement, inspector: Inspector, tooltip: string);
        toHtml(): HTMLElement;
        /**
         * Returns the total width in pixel of this tool, 0 by default
        */
        getPixelWidth(): number;
        /**
         * Updates the icon of this tool with the given string
         */
        protected _updateIcon(icon: string): void;
        abstract action(): any;
    }
}

declare module INSPECTOR {
    class PauseScheduleTool extends AbstractTool {
        private _isPause;
        constructor(parent: HTMLElement, inspector: Inspector);
        action(): void;
    }
}

declare module INSPECTOR {
    class PickTool extends AbstractTool {
        private _isActive;
        private _pickHandler;
        constructor(parent: HTMLElement, inspector: Inspector);
        action(): void;
        /** Deactivate this tool */
        private _deactivate();
        /** Pick a mesh in the scene */
        private _pickMesh(evt);
        private _updatePointerPosition(evt);
    }
}

declare module INSPECTOR {
    class PopupTool extends AbstractTool {
        constructor(parent: HTMLElement, inspector: Inspector);
        action(): void;
    }
}

declare module INSPECTOR {
    class RefreshTool extends AbstractTool {
        constructor(parent: HTMLElement, inspector: Inspector);
        action(): void;
    }
}

declare module INSPECTOR {
    class LabelTool extends AbstractTool {
        /** True if label are displayed, false otherwise */
        private _isDisplayed;
        private _canvas;
        private _labelInitialized;
        private _scene;
        private _canvas2DLoaded;
        private _newMeshObserver;
        private _removedMeshObserver;
        private _newLightObserver;
        private _removedLightObserver;
        private _newCameraObserver;
        private _removedCameraObserver;
        constructor(parent: HTMLElement, inspector: Inspector);
        dispose(): void;
        private _checkC2DLoaded();
        private _initializeLabels();
        private _createLabel(node);
        private _removeLabel(node);
        action(): void;
    }
}

declare module INSPECTOR {
    class Toolbar extends BasicElement {
        private _inspector;
        private _tools;
        constructor(inspector: Inspector);
        update(): void;
        protected _build(): void;
        private _addTools();
        /**
         * Returns the total width in pixel of the tabbar,
         * that corresponds to the sum of the width of each tab + toolbar width
        */
        getPixelWidth(): number;
    }
}

declare module INSPECTOR {
    /**
     * Removes the inspector panel
     */
    class DisposeTool extends AbstractTool {
        constructor(parent: HTMLElement, inspector: Inspector);
        action(): void;
    }
}

declare module INSPECTOR {
    class TreeItem extends BasicElement {
        private _tab;
        private _adapter;
        private _tools;
        children: Array<TreeItem>;
        private _lineContent;
        constructor(tab: PropertyTab, obj: Adapter);
        /** Returns the item ID == its adapter ID */
        readonly id: string;
        /** Add the given item as a child of this one */
        add(child: TreeItem): void;
        /**
         * Function used to compare this item to another tree item.
         * Returns the alphabetical sort of the adapter ID
         */
        compareTo(item: TreeItem): number;
        /** Returns true if the given obj correspond to the adapter linked to this tree item */
        correspondsTo(obj: any): boolean;
        /** hide all children of this item */
        fold(): void;
        /** Show all children of this item */
        unfold(): void;
        /** Build the HTML of this item */
        protected _build(): void;
        /**
         * Returns one HTML element (.details) containing all  details of this primitive
         */
        getDetails(): Array<PropertyLine>;
        update(): void;
        /**
         * Add an event listener on the item :
         * - one click display details
         * - on mouse hover the item is highlighted
         */
        protected _addEvent(): void;
        /** Highlight or downplay this node */
        highlight(b: boolean): void;
        /** Returns true if the node is folded, false otherwise */
        private _isFolded();
        /** Set this item as active (background lighter) in the tree panel */
        active(b: boolean): void;
    }
}

declare module INSPECTOR {
    abstract class AbstractTreeTool {
        protected _elem: HTMLElement;
        /** Is the tool enabled ? */
        protected _on: boolean;
        constructor();
        toHtml(): HTMLElement;
        protected _addEvents(): void;
        /**
         * Action launched when clicked on this element
         * Should be overrided
         */
        protected action(): void;
    }
}

declare module INSPECTOR {
    /** Any object implementing this interface should
     * provide methods to toggle its bounding box
     */
    interface IToolBoundingBox {
        isBoxVisible: () => boolean;
        setBoxVisible: (b: boolean) => void;
    }
    /**
     * Checkbox to display/hide the primitive
     */
    class BoundingBox extends AbstractTreeTool {
        private _obj;
        constructor(obj: IToolBoundingBox);
        protected action(): void;
        private _check();
    }
}

declare module INSPECTOR {
    /** Any object implementing this interface should
     * provide methods to toggle its visibility
     */
    interface IToolVisible {
        isVisible: () => boolean;
        setVisible: (b: boolean) => void;
    }
    /**
     * Checkbox to display/hide the primitive
     */
    class Checkbox extends AbstractTreeTool {
        private _obj;
        constructor(obj: IToolVisible);
        protected action(): void;
        private _check(dontEnable?);
    }
}

declare module INSPECTOR {
    /** Any object implementing this interface should
     * provide methods to toggle a debug area
     */
    interface IToolDebug {
        debug: (b: boolean) => void;
    }
    class DebugArea extends AbstractTreeTool {
        private _obj;
        constructor(obj: IToolDebug);
        protected action(): void;
    }
}

declare module INSPECTOR {
    /** Any object implementing this interface should
     * provide methods to retrieve its info
     */
    interface IToolInfo {
        getInfo: () => string;
    }
    /**
     * Checkbox to display/hide the primitive
     */
    class Info extends AbstractTreeTool {
        private _obj;
        private _tooltip;
        constructor(obj: IToolInfo);
        protected action(): void;
    }
}
