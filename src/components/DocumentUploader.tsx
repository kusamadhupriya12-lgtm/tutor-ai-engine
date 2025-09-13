import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  questionsGenerated?: number;
}

export const DocumentUploader = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not supported. Please upload PDF, TXT, or DOC files.`,
          variant: "destructive",
        });
        return;
      }

      const newDoc: UploadedDocument = {
        id: Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setDocuments(prev => [...prev, newDoc]);

      // Simulate upload and processing
      simulateUpload(newDoc.id);
    });
  };

  const simulateUpload = (docId: string) => {
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setDocuments(prev => prev.map(doc => 
          doc.id === docId 
            ? { ...doc, status: 'processing', progress: 100 }
            : doc
        ));
        
        // Simulate processing
        setTimeout(() => {
          const questionsCount = Math.floor(Math.random() * 15) + 5;
          setDocuments(prev => prev.map(doc => 
            doc.id === docId 
              ? { 
                  ...doc, 
                  status: 'completed', 
                  questionsGenerated: questionsCount 
                }
              : doc
          ));
          
          toast({
            title: "Document processed successfully",
            description: `Generated ${questionsCount} questions from the document.`,
          });
        }, 2000);
      } else {
        setDocuments(prev => prev.map(doc => 
          doc.id === docId 
            ? { ...doc, progress: Math.min(progress, 100) }
            : doc
        ));
      }
    }, 200);
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusBadge = (doc: UploadedDocument) => {
    switch (doc.status) {
      case 'uploading':
        return <Badge variant="outline">Uploading...</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing...</Badge>;
      case 'completed':
        return <Badge variant="secondary">{doc.questionsGenerated} Questions</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Upload Learning Documents</h2>
        <p className="text-muted-foreground">
          Upload PDFs, text files, or Word documents to generate personalized assessments.
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="shadow-elegant">
        <CardContent className="p-0">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-smooth ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop your documents here</h3>
            <p className="text-muted-foreground mb-4">
              Or click to select files (PDF, TXT, DOC, DOCX)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer shadow-primary">
                Select Files
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      {documents.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>
              Track the processing status of your uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border"
              >
                <div className="flex items-center space-x-4 flex-1">
                  {getStatusIcon(doc.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      {getStatusBadge(doc)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(doc.size)}</span>
                      {(doc.status === 'uploading' || doc.status === 'processing') && (
                        <div className="flex items-center space-x-2 flex-1 max-w-xs">
                          <Progress value={doc.progress} className="flex-1" />
                          <span>{Math.round(doc.progress)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(doc.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-accent/20 border-accent">
        <CardHeader>
          <CardTitle className="text-lg">Tips for Better Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Upload clear, well-structured documents for better question generation</p>
          <p>• PDFs with text (not scanned images) work best</p>
          <p>• Longer documents will generate more comprehensive assessments</p>
          <p>• Multiple documents on the same topic will create varied question types</p>
        </CardContent>
      </Card>
    </div>
  );
};