/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
	AzureWizardPromptStep,
	IAzureQuickPickItem,
} from "@microsoft/vscode-azext-utils";

import { localize } from "../../utils/localize";
import {
	IOpenInFileExplorerWizardContext,
	OpenBehavior,
} from "./IOpenInFileExplorerWizardContext";

export class OpenBehaviorStep extends AzureWizardPromptStep<IOpenInFileExplorerWizardContext> {
	public async prompt(
		context: IOpenInFileExplorerWizardContext,
	): Promise<void> {
		const picks: IAzureQuickPickItem<OpenBehavior>[] = [
			{
				label: localize(
					"OpenInCurrentWindow",
					"Open in current window",
				),
				data: "OpenInCurrentWindow",
			},
			{
				label: localize("OpenInNewWindow", "Open in new window"),
				data: "OpenInNewWindow",
			},
			{
				label: localize("AddToWorkspace", "Add to workspace"),
				data: "AddToWorkspace",
			},
		];

		const placeHolder: string = localize(
			"selectOpenBehavior",
			"Select how you would like to open this resource",
		);

		context.openBehavior = (
			await context.ui.showQuickPick(picks, { placeHolder })
		).data;
	}

	public shouldPrompt(context: IOpenInFileExplorerWizardContext): boolean {
		return (
			!context.openBehavior &&
			context.openBehavior !== "AlreadyOpen" &&
			context.openBehavior !== "DontOpen"
		);
	}
}
