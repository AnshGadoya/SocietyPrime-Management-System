import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  // Role State: 'Master' | 'Super Admin' | 'Society Admin' | 'Resident' | 'Security Guard'
  const [selectedRole, setSelectedRole] = useState('Master');

  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter your Username.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your Password.');
      return;
    }

    const result = await login(username, password, selectedRole);
    if (!result.success) {
      setErrorMessage(result.message || 'Login failed. Please check credentials.');
    }
  };

  const roles = [
    { key: 'Master', label: 'Master', iconName: 'key-outline' },
    { key: 'Super Admin', label: 'Super Admin', iconName: 'code-slash-outline' },
    { key: 'Society Admin', label: 'Admin', iconName: 'shield-checkmark-outline' },
    { key: 'Resident', label: 'Resident', iconName: 'home-outline' },
    { key: 'Security Guard', label: 'Guard', iconName: 'lock-closed-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF2FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Banner */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="business" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.appTitle}>SocietyPrime</Text>
            <Text style={styles.appSubtitle}>Enterprise Society & Gatekeeper ERP</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign In to Your Account</Text>

            {/* Role Selection Tabs */}
            <Text style={styles.inputLabel}>Select Your Role (5 System Roles)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              <View style={styles.roleContainer}>
                {roles.map((roleItem) => {
                  const isSelected = selectedRole === roleItem.key;
                  return (
                    <TouchableOpacity
                      key={roleItem.key}
                      style={[
                        styles.roleTab,
                        isSelected && styles.roleTabActive,
                      ]}
                      onPress={() => setSelectedRole(roleItem.key)}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name={roleItem.iconName}
                        size={13}
                        color={isSelected ? '#FFFFFF' : '#64748B'}
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={[
                          styles.roleText,
                          isSelected && styles.roleTextActive,
                        ]}
                      >
                        {roleItem.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Error Notification */}
            {errorMessage ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={18} color="#DC2626" style={{ marginRight: 8 }} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color="#64748B" style={styles.fieldIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your username"
                  placeholderTextColor="#94A3B8"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color="#64748B" style={styles.fieldIcon} />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Reset Password',
                    'Please contact your Society Management Office or Admin to reset your password.'
                  )
                }
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>
                  Sign In as {selectedRole}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              New Resident or Staff?{' '}
              <Text
                style={styles.footerLink}
                onPress={() =>
                  Alert.alert(
                    'Access Request',
                    'Please contact your Society Admin Committee to get registered.'
                  )
                }
              >
                Request Access
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E1B4B',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '600',
    marginTop: 2,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 3,
  },
  roleTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 4,
  },
  roleTabActive: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  roleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  fieldIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  eyeButton: {
    padding: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  rememberText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
  },
  footerLink: {
    color: '#4F46E5',
    fontWeight: '700',
  },
});
