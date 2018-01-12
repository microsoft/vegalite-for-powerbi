module powerbi.extensibility.visual {
    interface BarChartDataPoint {
        value: PrimitiveValue;
        category: string;
    }

    function visualTransform(options: VisualUpdateOptions) {
        let dataViews = options.dataViews;

        let dataPoints: BarChartDataPoint[] = [];

        if (!dataViews
            || !dataViews[0]
            || !dataViews[0].categorical
            || !dataViews[0].categorical.categories
            || !dataViews[0].categorical.categories[0].source
            || !dataViews[0].categorical.values)
            return null;

        let categorical = dataViews[0].categorical;
        let category = categorical.categories[0];
        let dataValue = categorical.values[0];

        let objects = dataViews[0].metadata.objects;

        let categoryTitle = category.source.displayName;
        let valueTitle = dataValue.source.displayName;

        for (let i = 0, len = Math.max(category.values.length, dataValue.values.length); i < len; i++) {
            dataPoints.push({
                category: category.values[i] + '',
                value: dataValue.values[i]
            });
        }

        return {dataPoints, categoryTitle, valueTitle};
    }

    export class BarChart implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;

        private view: any;

        constructor(options: VisualConstructorOptions) {
            console.log('Visual constructor', options);

            this.target = options.element;
        }

        @logExceptions()
        public update(options: VisualUpdateOptions) {
            this.settings = BarChart.parseSettings(options && options.dataViews && options.dataViews[0]);
            console.log('Visual update', options);

            if (this.view && (options.type & VisualUpdateType.Resize || options.type & VisualUpdateType.ResizeEnd)) {
                this.view.width(options.viewport.width).height(options.viewport.height).run();
                return;
            }

            const r = visualTransform(options);

            if (!r) {
                this.target.innerHTML = "Need category and measure";
                this.view = null;
                return;
            }

            const {dataPoints, categoryTitle, valueTitle} = r;

            // this should be type TopLevelExtendedSpec
            const spec = {
                $schema: "https://vega.github.io/schema/vega-lite/v2.json",
                width: options.viewport.width,
                height: options.viewport.height,
                padding: 0,
                autosize: {
                    type: "fit",
                    contains: "content"
                },
                data: {
                    values: dataPoints
                },
                mark: "bar",
                encoding: {
                    x: {field: "category", type: "ordinal", axis: {title: categoryTitle}},
                    y: {field: "value", type: "quantitative", axis: {title: valueTitle}}
                }
            };

            const vl = (window as any).vl;
            const vega = (window as any).vega;

            const vgSpec = vl.compile(spec).spec;

            const runtime = vega.parse(vgSpec);

            this.view = new vega.View(runtime)
                .logLevel(vega.Warn)
                .initialize(this.target)
                .renderer(this.settings.rendering.svg ? "svg" : "canvas")
                .run();
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}