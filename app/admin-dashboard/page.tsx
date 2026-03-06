// components/LeadsTable.tsx

"use client"

import { useState, useEffect, Fragment } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Phone, Mail, Calendar, RefreshCw, Users, FileText, ChevronDown, ChevronUp, Link2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  treatment: string
  procedure: string
  message: string
  city: string
  age: string
  consent: boolean
  source: string
  formName: string
  status: 'new' | 'contacted' | 'scheduled' | 'converted' | 'lost'
  telecrmSynced: boolean
  telecrmId?: string
  pageUrl?: string | null      // Allow null
  referrerUrl?: string | null  // Allow null
  createdAt: string
  updatedAt: string
}

interface LeadsTableProps {
  initialLeads?: Lead[]
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function LeadsTable({ 
  initialLeads = [], 
  autoRefresh = false,
  refreshInterval = 30000 
}: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [treatmentFilter, setTreatmentFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [formFilter, setFormFilter] = useState<string>("all")
  const [urlFilter, setUrlFilter] = useState<string>("all")
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Set client-side flag to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch leads from API
  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      
      if (response.ok) {
        setLeads(data.leads || [])
      } else {
        console.error('Failed to fetch leads:', data.error)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load leads on component mount
  useEffect(() => {
    fetchLeads()
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchLeads, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  // Sort leads
  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0
    
    const { key, direction } = sortConfig
    const aValue = a[key as keyof Lead]
    const bValue = b[key as keyof Lead]
    
    // Handle undefined or null values
    if (aValue === undefined || aValue === null) return direction === 'asc' ? -1 : 1
    if (bValue === undefined || bValue === null) return direction === 'asc' ? 1 : -1
    
    let aCompare: string | number
    let bCompare: string | number
    
    if (key === 'createdAt' || key === 'updatedAt') {
      aCompare = new Date(aValue as string).getTime()
      bCompare = new Date(bValue as string).getTime()
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      aCompare = aValue.toLowerCase()
      bCompare = bValue.toLowerCase()
    } else {
      aCompare = String(aValue).toLowerCase()
      bCompare = String(bValue).toLowerCase()
    }
    
    if (aCompare < bCompare) return direction === 'asc' ? -1 : 1
    if (aCompare > bCompare) return direction === 'asc' ? 1 : -1
    return 0
  })

  // Safe string conversion for filtering
  const safeString = (value: string | null | undefined): string => {
    if (value === null || value === undefined) return ''
    return String(value).toLowerCase()
  }

  // Filter leads based on search and filters
  const filteredLeads = sortedLeads.filter((lead) => {
    const matchesSearch = 
      safeString(lead.name).includes(safeString(searchTerm)) ||
      safeString(lead.phone).includes(safeString(searchTerm)) ||
      safeString(lead.email).includes(safeString(searchTerm)) ||
      safeString(lead.treatment).includes(safeString(searchTerm)) ||
      safeString(lead.message).includes(safeString(searchTerm)) ||
      safeString(lead.city).includes(safeString(searchTerm)) ||
      safeString(lead.formName).includes(safeString(searchTerm)) ||
      safeString(lead.pageUrl).includes(safeString(searchTerm)) ||
      safeString(lead.referrerUrl).includes(safeString(searchTerm))
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesTreatment = treatmentFilter === "all" || lead.treatment === treatmentFilter
    const matchesDate = dateFilter === "all" || isWithinDateRange(lead.createdAt, dateFilter)
    const matchesForm = formFilter === "all" || lead.formName === formFilter
    
    // Handle URL filter
    let matchesUrl = true
    if (urlFilter !== "all") {
      if (urlFilter === "direct") {
        matchesUrl = !lead.pageUrl
      } else if (lead.pageUrl) {
        try {
          const urlObj = new URL(lead.pageUrl)
          matchesUrl = urlObj.pathname === urlFilter
        } catch {
          matchesUrl = false
        }
      } else {
        matchesUrl = false
      }
    }
    
    return matchesSearch && matchesStatus && matchesTreatment && matchesDate && matchesForm && matchesUrl
  })

  function isWithinDateRange(date: string, range: string): boolean {
    if (!date) return false
    
    const leadDate = new Date(date)
    const now = new Date()
    
    switch (range) {
      case "today":
        return leadDate.toDateString() === now.toDateString()
      case "week":
        const weekAgo = new Date(now)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return leadDate >= weekAgo
      case "month":
        const monthAgo = new Date(now)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return leadDate >= monthAgo
      default:
        return true
    }
  }

  const getStatusBadge = (status: Lead['status']) => {
    const statusConfig = {
      new: { label: "New", color: "bg-blue-100 text-blue-800 border-blue-200" },
      contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      scheduled: { label: "Scheduled", color: "bg-purple-100 text-purple-800 border-purple-200" },
      converted: { label: "Converted", color: "bg-green-100 text-green-800 border-green-200" },
      lost: { label: "Lost", color: "bg-red-100 text-red-800 border-red-200" }
    }
    
    const config = statusConfig[status]
    return <Badge variant="outline" className={`${config.color} border`}>{config.label}</Badge>
  }

const getFormBadge = (formName: string | null | undefined) => {
  if (!formName) {
    return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Unknown</Badge>
  }
  
  const formConfig: { [key: string]: { label: string, color: string } } = {
    'bonitaa-form': { label: "Bonitaa Appointments", color: "bg-amber-100 text-amber-800 border-amber-200" },
    'nypuniya-form': { label: "Nypuniya Consultations", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    'default': { label: formName, color: "bg-gray-100 text-gray-800 border-gray-200" }
  }
  
  const config = formConfig[formName.toLowerCase()] || formConfig.default
  return <Badge variant="outline" className={`${config.color} border text-xs`}>{config.label}</Badge>
}
  // Function to get URL badge
  const getUrlBadge = (url: string | null | undefined) => {
    if (!url) return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Direct</Badge>;
    
    // Extract domain or page name
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname === '/' ? 'Homepage' : urlObj.pathname.split('/').pop() || 'Page';
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">{path}</Badge>;
    } catch {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Unknown</Badge>;
    }
  };

  const getTelecrmBadge = (synced: boolean) => {
    return synced ? 
      <Badge className="bg-green-100 text-green-800 border-green-200">Synced</Badge> :
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
  }

  // Get unique form names for filter
  const uniqueFormNames = Array.from(new Set(
    leads.map(lead => lead.formName).filter((name): name is string => !!name)
  ))
  
  // Get unique URLs for filter
  const uniqueUrls = Array.from(new Set(
    leads.map(lead => {
      if (!lead.pageUrl) return null;
      try {
        const urlObj = new URL(lead.pageUrl);
        return urlObj.pathname;
      } catch {
        return null;
      }
    }).filter((url): url is string => url !== null)
  ));

  // Get statistics with form grouping
  const getFormStats = () => {
    const stats: { [key: string]: { total: number, new: number, converted: number, synced: number } } = {}
    
    leads.forEach(lead => {
      const formName = lead.formName || 'Unknown'
      if (!stats[formName]) {
        stats[formName] = { total: 0, new: 0, converted: 0, synced: 0 }
      }
      
      stats[formName].total++
      if (lead.status === 'new') stats[formName].new++
      if (lead.status === 'converted') stats[formName].converted++
      if (lead.telecrmSynced) stats[formName].synced++
    })
    
    return stats
  }

  // Get URL statistics
  const getUrlStats = () => {
    const stats: { [key: string]: { total: number, new: number, converted: number } } = {}
    
    leads.forEach(lead => {
      if (!lead.pageUrl) {
        const key = 'Direct/Unknown'
        if (!stats[key]) stats[key] = { total: 0, new: 0, converted: 0 }
        stats[key].total++
        if (lead.status === 'new') stats[key].new++
        if (lead.status === 'converted') stats[key].converted++
        return
      }
      
      try {
        const urlObj = new URL(lead.pageUrl);
        const key = urlObj.pathname === '/' ? 'Homepage' : urlObj.pathname.split('/').pop() || 'Page';
        if (!stats[key]) stats[key] = { total: 0, new: 0, converted: 0 }
        stats[key].total++
        if (lead.status === 'new') stats[key].new++
        if (lead.status === 'converted') stats[key].converted++
      } catch {
        const key = 'Invalid URL'
        if (!stats[key]) stats[key] = { total: 0, new: 0, converted: 0 }
        stats[key].total++
        if (lead.status === 'new') stats[key].new++
        if (lead.status === 'converted') stats[key].converted++
      }
    })
    
    return stats
  }

  const formStats = getFormStats()
  const urlStats = getUrlStats()

  const exportToCSV = () => {
    const headers = ["Name", "Phone", "Email", "Treatment", "Message", "City", "Age", "Status", "Form Name", "Source", "Page URL", "Referrer URL", "TeleCRM Synced", "Created At"]
    const csvData = filteredLeads.map(lead => [
      lead.name || '',
      lead.phone || '',
      lead.email || '',
      lead.treatment || '',
      `"${(lead.message || '').replace(/"/g, '""')}"`,
      lead.city || '',
      lead.age || '',
      lead.status || '',
      lead.formName || '',
      lead.source || '',
      lead.pageUrl || '',
      lead.referrerUrl || '',
      lead.telecrmSynced ? "Yes" : "No",
      isClient ? new Date(lead.createdAt).toLocaleString('en-IN') : lead.createdAt
    ])
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(","))
      .join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const handleEmail = (email: string) => {
    if (email) {
      window.open(`mailto:${email}`, '_self')
    }
  }

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const toggleLeadExpansion = (leadId: string) => {
    setExpandedLead(current => current === leadId ? null : leadId)
  }

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ))
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  // Format date safely for client-side rendering
  const formatDate = (dateString: string) => {
    if (!isClient || !dateString) return { date: '', time: '' }
    
    try {
      const date = new Date(dateString)
      return {
        date: date.toLocaleDateString('en-IN'),
        time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }
    } catch {
      return { date: 'Invalid Date', time: '' }
    }
  }

  // Helper function to format form name for display
const formatFormName = (formName: string | null | undefined) => {
  if (!formName) return 'Unknown Form'
  
  const formDisplayNames: { [key: string]: string } = {
    'bonitaa-form': 'Bonitaa Appointments',
    'nypuniya-form': 'Nypuniya Consultations',
    'default': formName
  }
  
  return formDisplayNames[formName.toLowerCase()] || formDisplayNames.default
}

  // Helper function to open URL in new tab
  const openUrl = (url: string | null | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Card className="w-full bg-white border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Leads Management</CardTitle>
              <CardDescription className="text-gray-600">
                Manage and track all consultation requests from your website forms
                {autoRefresh && <span className="ml-2 text-xs text-green-600">• Auto-refresh enabled</span>}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={fetchLeads} 
                disabled={loading}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button 
                onClick={exportToCSV} 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Form Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
{Object.entries(formStats).map(([formName, stats]) => (
  <Card key={formName} className="p-4 bg-white border-gray-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-sm text-gray-900 capitalize">
            {formName === 'hairtreatment' ? 'Hair Treatment' : 
             formName === 'skin and hair leads' ? 'Skin & Hair' : 
             formName === 'bonitaa-form' ? 'Bonitaa Appointments' :
             formName === 'nypuniya-form' ? 'Nypuniya Consultations' :
             formName === 'Unknown' ? 'Unknown Form' : formName}
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
      </div>
      <div className="text-right text-xs space-y-1">
        <div className="flex items-center gap-1 justify-end">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600">New: {stats.new}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Converted: {stats.converted}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span className="text-gray-600">Synced: {stats.synced}</span>
        </div>
      </div>
    </div>
  </Card>
))}
          </div>

          {/* URL Statistics */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Traffic Sources by Page
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.entries(urlStats).map(([page, stats]) => (
                <div key={page} className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <div className="text-xs font-medium text-gray-700 truncate" title={page}>{page}</div>
                  <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>New: {stats.new}</span>
                    <span>Conv: {stats.converted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, phone, email, treatment, form, URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Status</SelectItem>
                <SelectItem value="new" className="focus:bg-gray-100">New</SelectItem>
                <SelectItem value="contacted" className="focus:bg-gray-100">Contacted</SelectItem>
                <SelectItem value="scheduled" className="focus:bg-gray-100">Scheduled</SelectItem>
                <SelectItem value="converted" className="focus:bg-gray-100">Converted</SelectItem>
                <SelectItem value="lost" className="focus:bg-gray-100">Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Treatments</SelectItem>
                <SelectItem value="Hair fall / excessive shedding" className="focus:bg-gray-100">Hair Fall</SelectItem>
                <SelectItem value="Thinning / reduced density" className="focus:bg-gray-100">Thinning</SelectItem>
                <SelectItem value="Dandruff / flaky, itchy scalp" className="focus:bg-gray-100">Dandruff</SelectItem>
                <SelectItem value="Oily scalp & greasy roots" className="focus:bg-gray-100">Oily Scalp</SelectItem>
                <SelectItem value="Dry, frizzy, rough hair" className="focus:bg-gray-100">Dry Hair</SelectItem>
                <SelectItem value="Hair Transplant" className="focus:bg-gray-100">Hair Transplant</SelectItem>
                <SelectItem value="Skin Rejuvenation" className="focus:bg-gray-100">Skin Rejuvenation</SelectItem>
                <SelectItem value="Facial Contouring" className="focus:bg-gray-100">Facial Contouring</SelectItem>
                <SelectItem value="Coimbatore" className="focus:bg-gray-100">Coimbatore Branch</SelectItem>
                <SelectItem value="Chennai" className="focus:bg-gray-100">Chennai Branch</SelectItem>
                <SelectItem value="Bangalore" className="focus:bg-gray-100">Bangalore Branch</SelectItem>
                <SelectItem value="Madurai" className="focus:bg-gray-100">Madurai Branch</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Form" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Forms</SelectItem>
                {uniqueFormNames.map(formName => (
                  <SelectItem key={formName} value={formName} className="focus:bg-gray-100">
                    {formName === 'hairtreatment' ? 'Hair Treatment' : 
                     formName === 'skin and hair leads' ? 'Skin & Hair' : 
                     formName === 'bonitaa-form' ? 'Bonitaa Appointments' :
                     formName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={urlFilter} onValueChange={setUrlFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Link2 className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Pages</SelectItem>
                {uniqueUrls.map(url => (
                  <SelectItem key={url} value={url} className="focus:bg-gray-100">
                    {url === '/' ? 'Homepage' : url}
                  </SelectItem>
                ))}
                <SelectItem value="direct" className="focus:bg-gray-100">Direct/Unknown</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Time</SelectItem>
                <SelectItem value="today" className="focus:bg-gray-100">Today</SelectItem>
                <SelectItem value="week" className="focus:bg-gray-100">This Week</SelectItem>
                <SelectItem value="month" className="focus:bg-gray-100">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortConfig?.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Treatment/Branch</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Form</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Sync</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Source URL</th>
                    <th 
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sortConfig?.key === 'createdAt' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Loading leads...
                        </div>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-gray-500">
                        No leads found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const formattedDate = formatDate(lead.createdAt)
                      return (
                        <Fragment key={lead.id}>
                          <tr 
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="p-4 align-middle font-medium text-gray-900">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  lead.status === 'new' ? 'bg-blue-500' :
                                  lead.status === 'contacted' ? 'bg-yellow-500' :
                                  lead.status === 'scheduled' ? 'bg-purple-500' :
                                  lead.status === 'converted' ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                                {lead.name || 'Unknown'}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-blue-600" />
                                  <span className="text-sm text-gray-700">{lead.phone || 'No phone'}</span>
                                </div>
                                {lead.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3 text-blue-600" />
                                    <span className="text-sm text-gray-700 truncate max-w-[120px]">{lead.email}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-gray-900">{lead.treatment || lead.procedure || "Not specified"}</span>
                                {lead.city && <span className="text-xs text-gray-600">{lead.city}</span>}
                                {lead.age && <span className="text-xs text-gray-600">Age: {lead.age}</span>}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              {getFormBadge(lead.formName)}
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer">
                                    {getStatusBadge(lead.status)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white border-gray-200 text-gray-900">
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'new')
                                    }}
                                  >
                                    New
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'contacted')
                                    }}
                                  >
                                    Contacted
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'scheduled')
                                    }}
                                  >
                                    Scheduled
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'converted')
                                    }}
                                  >
                                    Converted
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'lost')
                                    }}
                                  >
                                    Lost
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="p-4 align-middle">
                              {getTelecrmBadge(lead.telecrmSynced)}
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (lead.pageUrl) openUrl(lead.pageUrl);
                                  }}
                                  className="text-left"
                                  disabled={!lead.pageUrl}
                                >
                                  {getUrlBadge(lead.pageUrl)}
                                </button>
                                {lead.referrerUrl && (
                                  <div 
                                    className="text-xs text-gray-500 truncate max-w-[150px] cursor-pointer hover:text-blue-600"
                                    title={lead.referrerUrl}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openUrl(lead.referrerUrl);
                                    }}
                                  >
                                    Ref: {lead.referrerUrl.substring(0, 25)}...
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 align-middle text-sm text-gray-600">
                              {formattedDate.date}
                              <br />
                              <span className="text-xs">
                                {formattedDate.time}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCall(lead.phone)
                                  }}
                                  disabled={!lead.phone}
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                {lead.email && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEmail(lead.email)
                                    }}
                                  >
                                    <Mail className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <td colSpan={9} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                                    <div className="space-y-2 text-gray-700">
                                      <div><span className="font-medium">Source:</span> {lead.source || 'Not specified'}</div>
                                      <div><span className="font-medium">Age:</span> {lead.age || 'Not specified'}</div>
                                      <div><span className="font-medium">City:</span> {lead.city || 'Not specified'}</div>
                                      <div><span className="font-medium">Consent:</span> {lead.consent ? 'Yes' : 'No'}</div>
                                      <div><span className="font-medium">Form:</span> {formatFormName(lead.formName)}</div>
                                      {lead.telecrmId && (
                                        <div><span className="font-medium">TeleCRM ID:</span> {lead.telecrmId}</div>
                                      )}
                                      {lead.pageUrl && (
                                        <div>
                                          <span className="font-medium">Page URL:</span>{' '}
                                          <a 
                                            href={lead.pageUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            {lead.pageUrl}
                                          </a>
                                        </div>
                                      )}
                                      {lead.referrerUrl && (
                                        <div>
                                          <span className="font-medium">Referrer URL:</span>{' '}
                                          <a 
                                            href={lead.referrerUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            {lead.referrerUrl}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                                    <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                                      {lead.message || "No message provided"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
            <div>
              Showing {filteredLeads.length} of {leads.length} leads
              {searchTerm && ` • Filtered by: "${searchTerm}"`}
              {formFilter !== 'all' && ` • Form: ${
                formFilter === 'hairtreatment' ? 'Hair Treatment' : 
                formFilter === 'skin and hair leads' ? 'Skin & Hair' : 
                formFilter === 'bonitaa-form' ? 'Bonitaa Appointments' :
                formFilter
              }`}
              {urlFilter !== 'all' && urlFilter !== 'direct' && ` • Page: ${urlFilter}`}
              {urlFilter === 'direct' && ' • Page: Direct/Unknown'}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>New: {leads.filter(l => l.status === 'new').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Converted: {leads.filter(l => l.status === 'converted').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Synced: {leads.filter(l => l.telecrmSynced).length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}