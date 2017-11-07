module powerbi.extensibility.visual {
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class VisualSettings extends DataViewObjectsParser {
        public rendering = new RenderSettings();
    }

    export class RenderSettings {
        public svg = false;
    }
}
