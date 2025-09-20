"use client";

import { Button, Card, CardContent } from "@mui/material";
import { Star } from "lucide-react";
const SavedCandidates = () => {

   return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1>Saved Candidates (0)</h1>
            </div>
            
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="mb-2">No saved candidates yet</h3>
                <p className="text-gray-600 mb-4">
                  Save promising candidates to review them later and build your talent pipeline.
                </p>
                <Button variant="outline" onClick={() => setActiveTab('candidates')}>
                  Browse Candidates
                </Button>
              </CardContent>
            </Card>
          </div>
        );}
export default SavedCandidates;
