import { PerformanceScope } from "./PerformanceScope.shared";

export class ReportNode {

    children = new Map<string, ReportNode>();

    scope?: PerformanceScope;

}