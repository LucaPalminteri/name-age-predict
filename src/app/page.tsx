"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Hash } from "lucide-react";

interface AgifyResponse {
  count: number;
  name: string;
  age: number;
}

export default function AgifyComponent() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<AgifyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name.trim())}`);
      const data: AgifyResponse = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card
        className={`w-full max-w-lg mx-auto shadow-lg transition-all duration-500 ease-out transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center flex items-center justify-center">
            <User className="mr-2" /> Agify Name Age Predictor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name"
              className="w-full"
            />
            <Button type="submit" className="w-full bg-gray-500 hover:bg-gray-600" disabled={loading}>
              <Calendar className="mr-2 h-4 w-4" />
              Predict Age
            </Button>
          </form>
          {result && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm animate-fade-in">
              <p className="text-lg mb-2">
                <User className="inline mr-2 text-gray-500" />
                For the name <span className="font-semibold text-blue-600">{result.name}</span>, the predicted age is{" "}
                <span className="font-semibold text-green-600">{result.age}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <Hash className="mr-2 text-gray-400" />
                This prediction is based on data from {result.count.toLocaleString()} persons
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
