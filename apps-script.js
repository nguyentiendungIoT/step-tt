// Hàm lấy dữ liệu
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById('103qcXD2bIsPCULFYxtRv9oNJ5BLvaysb6oyKY2PTRDo');
    const action = e.parameter.action;
    
    if(action === 'loadData') {
      // Đọc Projects sheet
      let projectsSheet = ss.getSheetByName('Projects');
      let projects = [];
      
      if(projectsSheet) {
        const projectsLastRow = projectsSheet.getLastRow();
        if(projectsLastRow > 1) {
          const projectsData = projectsSheet.getRange(2, 1, projectsLastRow - 1, 12).getValues();
          projects = projectsData.map(row => ({
            id: row[0],
            title: row[1],
            created: row[2],
            isComplete: row[3],
            sourceLink: row[4],
            sourceNote: row[5],
            transcript: row[6],
            aiScript: row[7],
            sentToCapcut: row[8],
            imageCount: row[9],
            voiceCount: row[10],
            musicCount: row[11]
          })).filter(p => p.id);
        }
      }
      
      // Đọc Assets sheet
      let assetsSheet = ss.getSheetByName('Assets');
      let assets = [];
      
      if(assetsSheet) {
        const assetsLastRow = assetsSheet.getLastRow();
        if(assetsLastRow > 1) {
          const assetsData = assetsSheet.getRange(2, 1, assetsLastRow - 1, 6).getValues();
          assets = assetsData.map(row => ({
            projectId: row[0],
            assetType: row[1],
            index: row[2],
            name: row[3],
            mimeType: row[4],
            data: row[5]
          })).filter(a => a.projectId);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        projects: projects,
        assets: assets
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm lưu dữ liệu
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById('103qcXD2bIsPCULFYxtRv9oNJ5BLvaysb6oyKY2PTRDo');
    const payload = JSON.parse(e.postData.contents);
    
    if(payload.action === 'saveData') {
      // Save Projects
      let projectsSheet = ss.getSheetByName('Projects');
      if(!projectsSheet) {
        projectsSheet = ss.insertSheet('Projects');
      }
      
      const projectsLastRow = projectsSheet.getLastRow();
      if(projectsLastRow > 1) {
        projectsSheet.deleteRows(2, projectsLastRow - 1);
      }
      
      // Create header
      if(projectsSheet.getLastRow() === 0) {
        projectsSheet.appendRow(['ID', 'Title', 'Created', 'IsComplete', 'SourceLink', 'SourceNote', 'Transcript', 'AiScript', 'SentToCapcut', 'ImageCount', 'VoiceCount', 'MusicCount']);
      }
      
      // Add projects
      payload.projects.forEach(p => {
        projectsSheet.appendRow([
          p.id, p.title, p.created, p.isComplete,
          p.sourceLink, p.sourceNote, p.transcript, p.aiScript,
          p.sentToCapcut, p.imageCount, p.voiceCount, p.musicCount
        ]);
      });
      
      // Save Assets
      let assetsSheet = ss.getSheetByName('Assets');
      if(!assetsSheet) {
        assetsSheet = ss.insertSheet('Assets');
      }
      
      const assetsLastRow = assetsSheet.getLastRow();
      if(assetsLastRow > 1) {
        assetsSheet.deleteRows(2, assetsLastRow - 1);
      }
      
      // Create header
      if(assetsSheet.getLastRow() === 0) {
        assetsSheet.appendRow(['ProjectId', 'AssetType', 'Index', 'Name', 'MimeType', 'Data']);
      }
      
      // Add assets
      payload.assets.forEach(a => {
        assetsSheet.appendRow([
          a.projectId, a.assetType, a.index, a.name, a.mimeType, a.data
        ]);
      });
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        projectCount: payload.projects.length,
        assetCount: payload.assets.length
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
