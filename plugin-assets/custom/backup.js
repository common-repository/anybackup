// Generated by CoffeeScript 1.8.0
(function() {
  app.controller("BackupController", function($scope, $http, $controller, backupFactory, accountFactory) {
    $controller("BaseController", {
      $scope: $scope
    });
    $scope.loading = true;
    $scope.list = function() {
      return backupFactory.list(null, function(data) {
        $scope.backups = data.backups;
        return $scope.loading = false;
      });
    };
    $scope.editName = function() {
      var focus;
      $scope.editingName = true;
      focus = function() {
        return angular.element("#edit-name")[0].focus();
      };
      return window.setTimeout(focus, 1);
    };
    $scope.saveName = function() {
      var request;
      $scope.editingName = false;
      request = $http({
        url: ajaxurl,
        method: "GET",
        params: {
          action: "bits_backup_update_backup",
          id: $scope.selectedBackup.id,
          name: $scope.selectedBackup.name
        }
      });
      return request.success((function(_this) {
        return function(data, status, headers, config) {
          $scope.list();
          return typeof console !== "undefined" && console !== null ? console.log("Updated name.") : void 0;
        };
      })(this));
    };
    $scope.backupNow = function() {
      var data, request;
      $scope.status.backup_running = true;
      $scope.backup_cancelled = false;
      $scope.backup_loading = true;
      $scope.status.step_description = "Starting your backup";
      data = {
        action: "bits_backup_backup_now"
      };
      request = $http({
        url: ajaxurl,
        method: "POST",
        params: data
      });
      return request.success(function() {
        $scope.updateStatus(function(data) {
          return $scope.backup_loading = false;
        });
        return $scope.state = "enabled";
      });
    };
    $scope.supportMessageSent = function() {
      return $scope.showSupportMessage = true;
    };
    $scope.renderBackupOption = function(backup) {
      switch (backup.state) {
        case 'COMMITTED':
          return backup.name + ' created ' + $scope.readableDate(backup);
        case 'CANCELLED':
          return 'Cancelled: ' + backup.name + ' created ' + $scope.readableDate(backup);
        case 'ERROR':
          return 'Failed: ' + backup.name + ' created ' + $scope.readableDate(backup);
        default:
          return "Invalid backup: " + backup.name;
      }
    };
    $scope.showLogs = function() {
      return $scope.selectedBackup.showLogs = true;
    };
    $scope.hideLogs = function() {
      return $scope.selectedBackup.showLogs = false;
    };
    $scope.updateStatus();
    $scope.statusUpdated = function() {
      if ($scope.status.most_recent_backup && $scope.status.most_recent_backup.committed_seconds_ago !== null && $scope.status.most_recent_backup.committed_seconds_ago < 60) {
        return $scope.list();
      }
    };
    $scope.status = "Loading";
    $scope.step_number = -1;
    $scope.list();
    $scope.$on("user-login", function() {
      $scope.updateStatus();
      return $scope.list();
    });
    return $scope.$on("user-registered", function() {
      $scope.thanks_for_registering = true;
      $scope.updateStatus();
      return $scope.list();
    });
  });

}).call(this);
