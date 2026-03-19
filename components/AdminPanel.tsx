'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface BatteryRecord {
  id: string
  timestamp: string
  voltage: number
  temperature: number
  current: number
  chargingSource: 'solar' | 'grid'
  status: 'healthy' | 'warning' | 'critical'
}

export default function AdminPanel() {
  const [records, setRecords] = useState<BatteryRecord[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      voltage: 12.1,
      temperature: 32.5,
      current: 2.34,
      chargingSource: 'solar',
      status: 'healthy',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      voltage: 12.0,
      temperature: 31.2,
      current: 2.1,
      chargingSource: 'solar',
      status: 'healthy',
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    voltage: '',
    temperature: '',
    current: '',
    chargingSource: 'solar' as 'solar' | 'grid',
    status: 'healthy' as 'healthy' | 'warning' | 'critical',
  })

  const handleAdd = () => {
    setEditingId(null)
    setFormData({
      voltage: '',
      temperature: '',
      current: '',
      chargingSource: 'solar',
      status: 'healthy',
    })
    setOpenDialog(true)
  }

  const handleEdit = (record: BatteryRecord) => {
    setEditingId(record.id)
    setFormData({
      voltage: record.voltage.toString(),
      temperature: record.temperature.toString(),
      current: record.current.toString(),
      chargingSource: record.chargingSource,
      status: record.status,
    })
    setOpenDialog(true)
  }

  const handleSave = () => {
    if (!formData.voltage || !formData.temperature || !formData.current) {
      alert('Please fill all fields')
      return
    }

    if (editingId) {
      // Update
      setRecords(
        records.map(record =>
          record.id === editingId
            ? {
                ...record,
                voltage: parseFloat(formData.voltage),
                temperature: parseFloat(formData.temperature),
                current: parseFloat(formData.current),
                chargingSource: formData.chargingSource,
                status: formData.status,
              }
            : record
        )
      )
    } else {
      // Create
      const newRecord: BatteryRecord = {
        id: (records.length + 1).toString(),
        timestamp: new Date().toISOString(),
        voltage: parseFloat(formData.voltage),
        temperature: parseFloat(formData.temperature),
        current: parseFloat(formData.current),
        chargingSource: formData.chargingSource,
        status: formData.status,
      }
      setRecords([newRecord, ...records])
    }

    setOpenDialog(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(record => record.id !== id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#01bb88'
      case 'warning':
        return '#f59e0b'
      case 'critical':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#efefef' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#122b43' }}>
            Battery Records Management
          </h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAdd}
                className="flex items-center gap-2"
                style={{ backgroundColor: '#01bb88', color: 'white' }}
              >
                <Plus size={20} />
                Add Record
              </Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Record' : 'Add New Record'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="voltage">Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 12.1"
                    value={formData.voltage}
                    onChange={e => setFormData({ ...formData, voltage: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 32.5"
                    value={formData.temperature}
                    onChange={e => setFormData({ ...formData, temperature: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="current">Current (A)</Label>
                  <Input
                    id="current"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 2.34"
                    value={formData.current}
                    onChange={e => setFormData({ ...formData, current: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="source">Charging Source</Label>
                  <select
                    id="source"
                    value={formData.chargingSource}
                    onChange={e => setFormData({ ...formData, chargingSource: e.target.value as 'solar' | 'grid' })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#01bb88' } as any}
                  >
                    <option value="solar">Solar</option>
                    <option value="grid">Grid</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as 'healthy' | 'warning' | 'critical' })}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#01bb88' } as any}
                  >
                    <option value="healthy">Healthy</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full"
                  style={{ backgroundColor: '#01bb88', color: 'white' }}
                >
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: '#122b43' }}>
                  <TableHead className="text-white">Timestamp</TableHead>
                  <TableHead className="text-white text-right">Voltage (V)</TableHead>
                  <TableHead className="text-white text-right">Temp (°C)</TableHead>
                  <TableHead className="text-white text-right">Current (A)</TableHead>
                  <TableHead className="text-white">Source</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No records found. Click "Add Record" to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record, index) => (
                    <TableRow
                      key={record.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                      }}
                    >
                      <TableCell className="text-sm">
                        {new Date(record.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {record.voltage.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {record.temperature.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {record.current.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded text-sm font-medium text-white" style={{ backgroundColor: record.chargingSource === 'solar' ? '#f59e0b' : '#3b82f6' }}>
                          {record.chargingSource.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-1 rounded text-sm font-medium text-white"
                          style={{ backgroundColor: getStatusColor(record.status) }}
                        >
                          {record.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(record)}
                          >
                            <Edit2 size={16} style={{ color: '#01bb88' }} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(record.id)}
                          >
                            <Trash2 size={16} style={{ color: '#ef4444' }} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Total Records</p>
            <p className="text-3xl font-bold" style={{ color: '#122b43' }}>
              {records.length}
            </p>
          </Card>
          <Card className="p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Healthy</p>
            <p className="text-3xl font-bold" style={{ color: '#01bb88' }}>
              {records.filter(r => r.status === 'healthy').length}
            </p>
          </Card>
          <Card className="p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Warnings</p>
            <p className="text-3xl font-bold" style={{ color: '#f59e0b' }}>
              {records.filter(r => r.status === 'warning').length}
            </p>
          </Card>
          <Card className="p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Critical</p>
            <p className="text-3xl font-bold" style={{ color: '#ef4444' }}>
              {records.filter(r => r.status === 'critical').length}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
