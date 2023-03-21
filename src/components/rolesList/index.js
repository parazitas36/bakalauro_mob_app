import React from 'react';
import {Select, CheckIcon, Box} from 'native-base';
import {scale} from 'react-native-size-matters';
import Resources from '../../Resources';
import styles from './styles';

const RolesList = props => {
  const [role, setRole] = props?.rolesState?.useState;

  return (
    <Box style={styles.box}>
      <Select
        selectedValue={role}
        minWidth={scale(150)}
        maxWidth={scale(200)}
        placeholder={Resources.Placeholders.Role}
        _selectedItem={{
          endIcon: <CheckIcon size={scale(15)} />,
        }}
        style={styles.text}
        mt={1}
        onValueChange={itemValue => setRole(itemValue)}>
        <Select.Item label={Resources.Roles.SportsClubAdmin} value="0" />
        <Select.Item label={Resources.Roles.Trainer} value="1" />
        <Select.Item label={Resources.Roles.User} value="2" />
      </Select>
    </Box>
  );
};

export default RolesList;
