import { NextRequest, NextResponse } from 'next/server';

// In-memory log storage (shared between routes)
let requestLogs: Array<{
  id: string;
  timestamp: string;
  userIP: string;
  endpoint: string;
  responseTime: number;
  prompt: string;
  metadata?: any;
  success: boolean;
  error?: string;
}> = [];

// Export function to get logs (called by the proxy route)
export function getRequestLogs() {
  return requestLogs;
}

// Export function to add log (called by the proxy route)
export function addRequestLog(log: typeof requestLogs[0]) {
  requestLogs.push(log);
  // Keep only last 1000 logs to prevent memory issues
  if (requestLogs.length > 1000) {
    requestLogs = requestLogs.slice(-1000);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const allLogs = getRequestLogs();
    
    // Get logs with pagination
    const paginatedLogs = allLogs
      .slice(offset, offset + limit)
      .map(log => ({
        id: log.id,
        timestamp: log.timestamp,
        userIP: log.userIP,
        endpoint: log.endpoint,
        responseTime: log.responseTime,
        prompt: log.prompt,
        metadata: log.metadata,
        success: log.success,
        error: log.error
      }));
    
    return NextResponse.json({
      success: true,
      data: {
        logs: paginatedLogs,
        total: allLogs.length,
        limit,
        offset
      }
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear all logs
    requestLogs.length = 0;
    
    return NextResponse.json({
      success: true,
      message: 'All logs cleared'
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
