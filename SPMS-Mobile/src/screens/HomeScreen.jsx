import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, switchRole, logout, isLoading } = useAuth();

  const currentRole = user?.role || 'Master';

  const roles = [
    { key: 'Master', label: 'Master', icon: 'key-outline' },
    { key: 'Super Admin', label: 'Super Admin', icon: 'code-slash-outline' },
    { key: 'Society Admin', label: 'Admin', icon: 'shield-checkmark-outline' },
    { key: 'Resident', label: 'Resident', icon: 'home-outline' },
    { key: 'Security Guard', label: 'Guard', icon: 'lock-closed-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* TOP QUICK 5-ROLE TESTING SWITCHER BAR */}
      <View style={styles.demoBar}>
        <View style={styles.demoTitleRow}>
          <Ionicons name="flask-outline" size={14} color="#6366F1" />
          <Text style={styles.demoText}>5-ROLE LIVE TESTING SWITCHER</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.rolePickerRow}>
            {roles.map((r) => {
              const isActive = currentRole === r.key;
              return (
                <TouchableOpacity
                  key={r.key}
                  style={[styles.pickerPill, isActive && styles.pickerPillActive]}
                  onPress={() => switchRole(r.key)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={r.icon}
                    size={12}
                    color={isActive ? '#FFFFFF' : '#64748B'}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.pickerText, isActive && styles.pickerTextActive]}>
                    {r.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appName}>SocietyPrime ERP</Text>
            <Text style={styles.societyName}>{user?.societyName}</Text>
          </View>
          <View style={[styles.roleBadge, currentRole === 'Master' && styles.masterBadge, currentRole === 'Super Admin' && styles.superAdminBadge]}>
            <Text style={[styles.roleBadgeText, (currentRole === 'Master' || currentRole === 'Super Admin') && styles.whiteBadgeText]}>
              {currentRole}
            </Text>
          </View>
        </View>

        {/* DYNAMIC DASHBOARD VIEWS BASED ON 5 SYSTEM ROLES */}
        {currentRole === 'Master' && <MasterDashboard user={user} />}
        {currentRole === 'Super Admin' && <SuperAdminDashboard user={user} />}
        {currentRole === 'Society Admin' && <SocietyAdminDashboard user={user} />}
        {currentRole === 'Resident' && <ResidentDashboard user={user} />}
        {currentRole === 'Security Guard' && <SecurityGuardDashboard user={user} />}

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutButtonText}>
            {isLoading ? 'Signing Out...' : 'Sign Out'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ====================================================================
 * 1. MASTER ROLE (APP OWNER BUSINESS DASHBOARD)
 * Business Insights, Global Revenue, Registered Societies with Admin Names
 * ==================================================================== */
function MasterDashboard({ user }) {
  const societies = [
    { id: '1', name: 'Royal Palm Heights', admin: 'Rajesh Sharma', units: 320, plan: 'Enterprise', status: 'Active', mrr: '$2,400/mo' },
    { id: '2', name: 'Greenwood Meadows', admin: 'Priya Mehta', units: 210, plan: 'Pro', status: 'Active', mrr: '$1,650/mo' },
    { id: '3', name: 'Skyline Luxury Towers', admin: 'Vikram Malhotra', units: 450, plan: 'Enterprise', status: 'Active', mrr: '$3,800/mo' },
    { id: '4', name: 'Silver Oak Residency', admin: 'Sunil Verma', units: 150, plan: 'Basic', status: 'Pending', mrr: '$950/mo' },
  ];

  return (
    <View style={styles.dashboardView}>
      <Text style={styles.sectionHeader}>👑 Master App Owner Platform Insights</Text>

      {/* Global Revenue & Platform Metrics */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#4F46E5' }]}>
          <Ionicons name="stats-chart" size={22} color="#E0E7FF" />
          <Text style={styles.statNumberLight}>$48,500</Text>
          <Text style={styles.statLabelLight}>Total Platform MRR</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#0F172A' }]}>
          <Ionicons name="business" size={22} color="#94A3B8" />
          <Text style={styles.statNumberLight}>24</Text>
          <Text style={styles.statLabelLight}>Registered Societies</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Ionicons name="people-outline" size={20} color="#6366F1" />
          <Text style={styles.statNumberDark}>12,450</Text>
          <Text style={styles.statLabelDark}>Total Platform Users</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Ionicons name="shield-outline" size={20} color="#10B981" />
          <Text style={styles.statNumberDark}>180</Text>
          <Text style={styles.statLabelDark}>Active Guards</Text>
        </View>
      </View>

      {/* Registered Societies with Admin Names */}
      <View style={styles.cardBlock}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardBlockTitle}>Registered Societies & Society Admins</Text>
          <TouchableOpacity onPress={() => Alert.alert('Add Society', 'Opening Society Onboarding Wizard')}>
            <Text style={styles.linkText}>+ Add Society</Text>
          </TouchableOpacity>
        </View>

        {societies.map((soc) => (
          <View key={soc.id} style={styles.tableRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tablePrimaryText}>{soc.name}</Text>
              <Text style={styles.tableSecondaryText}>
                Society Admin: <Text style={{ fontWeight: '700', color: '#4F46E5' }}>{soc.admin}</Text>
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={[styles.pillBadge, soc.status === 'Active' ? styles.pillActive : styles.pillPending]}>
                <Text style={[styles.pillBadgeText, soc.status === 'Active' ? styles.pillActiveText : styles.pillPendingText]}>
                  {soc.status}
                </Text>
              </View>
              <Text style={styles.tableSubDetail}>{soc.units} Units • {soc.mrr}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Master Business Actions */}
      <Text style={styles.sectionHeader}>Platform Management & Settings</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Audit Logs', 'Opening System Audit Logs')}>
          <Ionicons name="document-text-outline" size={20} color="#4F46E5" />
          <Text style={styles.actionTileText}>System Audit Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Revenue', 'Opening Billing Reports')}>
          <Ionicons name="card-outline" size={20} color="#10B981" />
          <Text style={styles.actionTileText}>Billing Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ====================================================================
 * 2. SUPER ADMIN ROLE (DEVELOPER PORTAL)
 * Developer view displaying ALL 3 ROLE SCREENS on ONE Home Screen
 * ==================================================================== */
function SuperAdminDashboard({ user }) {
  // Mode: 'ALL' (Stacked All 3 Screens) | 'Society Admin' | 'Resident' | 'Security Guard'
  const [viewMode, setViewMode] = useState('ALL');

  return (
    <View style={styles.dashboardView}>
      {/* Developer Control Panel */}
      <View style={styles.devControlBox}>
        <View style={styles.devHeaderRow}>
          <Ionicons name="code-slash" size={20} color="#4F46E5" />
          <Text style={styles.devHeaderTitle}>Super Admin (Developer Screen Inspector)</Text>
        </View>
        <Text style={styles.devHeaderSub}>
          Inspect and test all 3 remaining role screens (**Society Admin**, **Resident**, **Security Guard**) right here on one screen:
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          <View style={styles.devTabsRow}>
            <TouchableOpacity
              style={[styles.devPill, viewMode === 'ALL' && styles.devPillActive]}
              onPress={() => setViewMode('ALL')}
            >
              <Ionicons name="layers-outline" size={13} color={viewMode === 'ALL' ? '#FFFFFF' : '#4F46E5'} style={{ marginRight: 4 }} />
              <Text style={[styles.devPillText, viewMode === 'ALL' && styles.devPillTextActive]}>All 3 Screens Stacked</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.devPill, viewMode === 'Society Admin' && styles.devPillActive]}
              onPress={() => setViewMode('Society Admin')}
            >
              <Ionicons name="shield-checkmark-outline" size={13} color={viewMode === 'Society Admin' ? '#FFFFFF' : '#4F46E5'} style={{ marginRight: 4 }} />
              <Text style={[styles.devPillText, viewMode === 'Society Admin' && styles.devPillTextActive]}>1. Society Admin Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.devPill, viewMode === 'Resident' && styles.devPillActive]}
              onPress={() => setViewMode('Resident')}
            >
              <Ionicons name="home-outline" size={13} color={viewMode === 'Resident' ? '#FFFFFF' : '#4F46E5'} style={{ marginRight: 4 }} />
              <Text style={[styles.devPillText, viewMode === 'Resident' && styles.devPillTextActive]}>2. Resident Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.devPill, viewMode === 'Security Guard' && styles.devPillActive]}
              onPress={() => setViewMode('Security Guard')}
            >
              <Ionicons name="lock-closed-outline" size={13} color={viewMode === 'Security Guard' ? '#FFFFFF' : '#4F46E5'} style={{ marginRight: 4 }} />
              <Text style={[styles.devPillText, viewMode === 'Security Guard' && styles.devPillTextActive]}>3. Guard Screen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* RENDER ROLE SCREENS ACCORDING TO VIEW MODE */}
      {(viewMode === 'ALL' || viewMode === 'Society Admin') && (
        <View style={styles.rolePreviewContainer}>
          <View style={[styles.rolePreviewHeader, { backgroundColor: '#4F46E5' }]}>
            <Ionicons name="shield-checkmark" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.rolePreviewHeaderText}>1. SOCIETY ADMIN SCREEN VIEW</Text>
          </View>
          <SocietyAdminDashboard user={user} />
        </View>
      )}

      {(viewMode === 'ALL' || viewMode === 'Resident') && (
        <View style={styles.rolePreviewContainer}>
          <View style={[styles.rolePreviewHeader, { backgroundColor: '#059669' }]}>
            <Ionicons name="home" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.rolePreviewHeaderText}>2. RESIDENT SCREEN VIEW</Text>
          </View>
          <ResidentDashboard user={user} />
        </View>
      )}

      {(viewMode === 'ALL' || viewMode === 'Security Guard') && (
        <View style={styles.rolePreviewContainer}>
          <View style={[styles.rolePreviewHeader, { backgroundColor: '#DC2626' }]}>
            <Ionicons name="lock-closed" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.rolePreviewHeaderText}>3. SECURITY GUARD SCREEN VIEW</Text>
          </View>
          <SecurityGuardDashboard user={user} />
        </View>
      )}
    </View>
  );
}

/* ====================================================================
 * 3. SOCIETY ADMIN ROLE (SOCIETY ERP DASHBOARD)
 * ==================================================================== */
function SocietyAdminDashboard({ user }) {
  return (
    <View style={styles.dashboardView}>
      <Text style={styles.sectionHeader}>Society Operations (Society Admin ERP)</Text>

      {/* Admin Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCardWhite}>
          <Ionicons name="cash-outline" size={20} color="#10B981" />
          <Text style={styles.statNumberDark}>88%</Text>
          <Text style={styles.statLabelDark}>Maintenance Collected</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Ionicons name="warning-outline" size={20} color="#F59E0B" />
          <Text style={styles.statNumberDark}>5</Text>
          <Text style={styles.statLabelDark}>Open Complaints</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Ionicons name="walk-outline" size={20} color="#6366F1" />
          <Text style={styles.statNumberDark}>210</Text>
          <Text style={styles.statLabelDark}>Gate Visitors Today</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#3B82F6" />
          <Text style={styles.statNumberDark}>4 / 4</Text>
          <Text style={styles.statLabelDark}>Guards on Duty</Text>
        </View>
      </View>

      {/* Quick Admin Actions */}
      <View style={styles.cardBlock}>
        <Text style={styles.cardBlockTitle}>Quick Admin Controls</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Notice', 'Create New Circular Notice')}>
            <Ionicons name="megaphone-outline" size={22} color="#4F46E5" />
            <Text style={styles.actionTileText}>Post Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Approvals', '3 Resident Registrations Pending')}>
            <Ionicons name="person-add-outline" size={22} color="#10B981" />
            <Text style={styles.actionTileText}>Approve Residents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Staff', 'Opening Guard Shift Roster')}>
            <Ionicons name="calendar-outline" size={22} color="#F59E0B" />
            <Text style={styles.actionTileText}>Guard Roster</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Complaints', '5 Complaints require review')}>
            <Ionicons name="build-outline" size={22} color="#EF4444" />
            <Text style={styles.actionTileText}>Complaints Desk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ====================================================================
 * 4. RESIDENT ROLE (RESIDENT PORTAL)
 * ==================================================================== */
function ResidentDashboard({ user }) {
  return (
    <View style={styles.dashboardView}>
      {/* Resident Info Card */}
      <View style={styles.residentCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user?.name ? user.name.charAt(0) : 'R'}</Text>
        </View>
        <Text style={styles.resName}>{user?.name}</Text>
        <Text style={styles.resFlat}>Flat B-304 • Owner</Text>

        <View style={styles.billBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" style={{ marginRight: 4 }} />
          <Text style={styles.billBadgeText}>August Maintenance Paid ($250)</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Resident Services</Text>

      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionTileLarge, { backgroundColor: '#4F46E5' }]}
          onPress={() => Alert.alert('Pre-approve Visitor', 'Visitor QR Code Generated: #QR-8921')}
        >
          <Ionicons name="qr-code-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionTileLargeText}>Pre-Approve Visitor Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Pay Maintenance', 'No pending dues.')}>
          <Ionicons name="card-outline" size={22} color="#10B981" />
          <Text style={styles.actionTileText}>Pay Bills</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Complaint', 'Raise new ticket')}>
          <Ionicons name="construct-outline" size={22} color="#F59E0B" />
          <Text style={styles.actionTileText}>Raise Ticket</Text>
        </TouchableOpacity>
      </View>

      {/* Noticeboard Snapshot */}
      <View style={styles.cardBlock}>
        <Text style={styles.cardBlockTitle}>Society Noticeboard</Text>
        <View style={styles.noticeItem}>
          <Ionicons name="information-circle-outline" size={18} color="#4F46E5" style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.noticeTitle}>Annual General Meeting (AGM)</Text>
            <Text style={styles.noticeSub}>Sunday, Aug 10 • 10:00 AM at Clubhouse</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* ====================================================================
 * 5. SECURITY GUARD ROLE (GATEKEEPER PORTAL)
 * ==================================================================== */
function SecurityGuardDashboard({ user }) {
  const visitors = [
    { id: '1', name: 'Ramesh Kumar', type: 'Cab Driver (MH-12-AB-3456)', destination: 'Flat B-304', status: 'Approved' },
    { id: '2', name: 'Zomato Delivery', type: 'Food Courier', destination: 'Flat C-102', status: 'Pending' },
  ];

  return (
    <View style={styles.dashboardView}>
      {/* Emergency Panic Button */}
      <TouchableOpacity
        style={styles.panicButton}
        onPress={() => Alert.alert('EMERGENCY ALARM', 'Security Alarm Broadcast sent to Admin & All Guards!')}
      >
        <Ionicons name="alert-circle" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.panicButtonText}>EMERGENCY PANIC ALARM</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Gatekeeper Checkpoint (Gate 1)</Text>

      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={[styles.actionTileLarge, { backgroundColor: '#10B981' }]}
          onPress={() => Alert.alert('Scan QR', 'Opening Visitor Pass Scanner Camera')}
        >
          <Ionicons name="scan-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionTileLargeText}>Scan Visitor Pass QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Check In', 'Manual Entry Form')}>
          <Ionicons name="person-add-outline" size={22} color="#4F46E5" />
          <Text style={styles.actionTileText}>Log Visitor Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionTile} onPress={() => Alert.alert('Vehicle Log', 'Vehicle Search')}>
          <Ionicons name="car-outline" size={22} color="#6366F1" />
          <Text style={styles.actionTileText}>Vehicle Check</Text>
        </TouchableOpacity>
      </View>

      {/* Live Gate Queue */}
      <View style={styles.cardBlock}>
        <Text style={styles.cardBlockTitle}>Live Visitor Gate Queue</Text>
        {visitors.map((v) => (
          <View key={v.id} style={styles.tableRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tablePrimaryText}>{v.name}</Text>
              <Text style={styles.tableSecondaryText}>{v.type} → <Text style={{ fontWeight: '700', color: '#4F46E5' }}>{v.destination}</Text></Text>
            </View>
            <View style={[styles.pillBadge, v.status === 'Approved' ? styles.pillActive : styles.pillPending]}>
              <Text style={[styles.pillBadgeText, v.status === 'Approved' ? styles.pillActiveText : styles.pillPendingText]}>
                {v.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ====================================================================
 * STYLES
 * ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  demoBar: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7FF',
  },
  demoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  demoText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4338CA',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  rolePickerRow: {
    flexDirection: 'row',
  },
  pickerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 6,
  },
  pickerPillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  pickerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  pickerTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  headerLeft: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  societyName: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  roleBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  masterBadge: {
    backgroundColor: '#0F172A',
  },
  superAdminBadge: {
    backgroundColor: '#4F46E5',
  },
  roleBadgeText: {
    color: '#4338CA',
    fontWeight: '700',
    fontSize: 11,
  },
  whiteBadgeText: {
    color: '#FFFFFF',
  },
  dashboardView: {
    marginBottom: 16,
  },
  devControlBox: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  devHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  devHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#312E81',
    marginLeft: 6,
  },
  devHeaderSub: {
    fontSize: 11,
    color: '#4338CA',
    marginTop: 4,
  },
  devTabsRow: {
    flexDirection: 'row',
  },
  devPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  devPillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  devPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  devPillTextActive: {
    color: '#FFFFFF',
  },
  rolePreviewContainer: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  rolePreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  rolePreviewHeaderText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginTop: 12,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  statCardWhite: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statNumberLight: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabelLight: {
    fontSize: 11,
    color: '#E0E7FF',
    marginTop: 2,
    fontWeight: '500',
  },
  statNumberDark: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
  },
  statLabelDark: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  cardBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBlockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '700',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tablePrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tableSecondaryText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  tableSubDetail: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  pillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pillActive: {
    backgroundColor: '#DCFCE7',
  },
  pillPending: {
    backgroundColor: '#FEF3C7',
  },
  pillBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  pillActiveText: {
    color: '#166534',
  },
  pillPendingText: {
    color: '#92400E',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionTile: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  actionTileText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 6,
  },
  actionTileLarge: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTileLargeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  residentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  resName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  resFlat: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  billBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  billBadgeText: {
    color: '#065F46',
    fontSize: 11,
    fontWeight: '700',
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  noticeSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  panicButton: {
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  panicButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
