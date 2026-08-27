Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

strDesktop = WshShell.SpecialFolders("Desktop")
strAppPath = fso.GetParentFolderName(WScript.ScriptFullName)
strIconPath = strAppPath & "\assets\app.ico"
strShortcutPath = strDesktop & "\Financial Disk.lnk"

If fso.FileExists(strShortcutPath) Then
    fso.DeleteFile(strShortcutPath)
End If

Set oShortcut = WshShell.CreateShortcut(strShortcutPath)
oShortcut.TargetPath = "cmd.exe"
oShortcut.Arguments = "/c npx -y nw """ & strAppPath & """"
oShortcut.IconLocation = strIconPath
oShortcut.WorkingDirectory = strAppPath
oShortcut.WindowStyle = 7 ' Minimized window
oShortcut.Save

