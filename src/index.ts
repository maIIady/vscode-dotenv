import * as vscode from 'vscode'

export const activate = () => {
    vscode.languages.registerSelectionRangeProvider('dotenv', {
        provideSelectionRanges(document, positions, token) {
            return positions
                .map(position => {
                    const line = document.lineAt(position.line)
                    const equalsIndex = line.text.indexOf('=')
                    if (equalsIndex === -1) return undefined
                    const equalsPos = new vscode.Position(position.line, equalsIndex)
                    const lineStart = new vscode.Position(position.line, 0)
                    const lineEnd = new vscode.Position(position.line, line.text.length)
                    return new vscode.SelectionRange(
                        position.character < equalsIndex ? new vscode.Range(lineStart, equalsPos) : new vscode.Range(equalsPos.translate(0, 1), lineEnd),
                    )
                })
                .filter(Boolean) as vscode.SelectionRange[]
        },
    })
}
