import { Select, Stack, useColorModeValue } from "@chakra-ui/react";
import { disciplines, cities } from '../../../backend/models/enums.js';
import { useServiceProviderStore } from "../store/serviceProvider";

const FilterBar = () => {
    const setDiscipline = useServiceProviderStore((s) => s.setDiscipline);
    const setCity = useServiceProviderStore((s) => s.setCity);

    return (
        <Stack direction={'row'} spacing={4} mb={6}>
            <Select bg={useColorModeValue("white", "black")} placeholder="All disciplines" onChange={(e) => setDiscipline(e.target.value)}>
                {Object.values(disciplines).map((d) => (
                    <option key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1).replace("_", " ")}
                    </option>
                ))}
            </Select>
            <Select bg={useColorModeValue("white", "black")} placeholder="All cities" onChange={(e) => setCity(e.target.value)}>
                {Object.values(cities).map((d) => (
                    <option key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1).replace("_", " ")}
                    </option>
                ))}
            </Select>
        </Stack>
    );
};

export default FilterBar;